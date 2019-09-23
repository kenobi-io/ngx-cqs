import { NgModuleRef, Injectable, Type } from '@angular/core';
import 'reflect-metadata';
import { QUERY_HANDLER_METADATA } from './decorators/constants';
import { QueryHandlerNotFoundException } from './exceptions';
import { InvalidQueryHandlerException } from './exceptions/invalid-query-handler.exception';
import { ObservableBus } from './utils/observable-bus';
import { IQueryHandler } from './interfaces/queries/query-handler.interface';
import { IQuery } from './interfaces/queries/query.interface';
import { IQueryResult } from './interfaces/queries/query-result.interface';
import { IQueryBus } from './interfaces/queries/query-bus.interface';

export type QueryHandlerType = Type<IQueryHandler<IQuery, IQueryResult>>;

@Injectable()
export class QueryBus extends ObservableBus<IQuery> implements IQueryBus {
  private handlers = new Map<string, IQueryHandler<IQuery, IQueryResult>>();

  constructor(private readonly moduleRef: NgModuleRef<IQuery>) {
    super();
  }

  async execute<T extends IQuery, TResult extends IQueryResult>(
    query: T,
  ): Promise<TResult> {
    const handler = this.handlers.get(this.getQueryName(query));
    if (!handler) {
      throw new QueryHandlerNotFoundException();
    }
    this.subject$.next(query);
    const result = await handler.execute(query);
    return result as TResult;
  }

  bind<T extends IQuery, TResult>(
    handler: IQueryHandler<T, TResult>,
    name: string,
  ) {
    this.handlers.set(name, handler);
  }

  register(handlers: QueryHandlerType[] = []) {
    handlers.forEach(handler => this.registerHandler(handler));
  }

  protected registerHandler(handler: QueryHandlerType) {
    const instance = this.moduleRef.injector.get(handler, { strict: false });
    if (!instance) {
      return;
    }
    const target = this.reflectQueryName(handler);
    if (!target) {
      throw new InvalidQueryHandlerException();
    }
    this.bind(instance as IQueryHandler<IQuery, IQueryResult>, target.name);
  }

  private getQueryName(query): string {
    const { constructor } = Object.getPrototypeOf(query);
    return constructor.name as string;
  }

  private reflectQueryName(handler: QueryHandlerType): FunctionConstructor {
    return Reflect.getOwnMetadata(QUERY_HANDLER_METADATA, handler);
  }
}
