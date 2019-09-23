import { Injectable, NgModule, Type } from '@angular/core';
import {
  COMMAND_HANDLER_METADATA,
  EVENTS_HANDLER_METADATA,
  QUERY_HANDLER_METADATA,
  SAGA_METADATA,
} from '../decorators/constants';
import { ICommandHandler, IEventHandler, IQueryHandler } from '../interfaces';
import { CqrsOptions } from '../interfaces/cqrs-options.interface';
import 'reflect-metadata';

@Injectable()
export class ExplorerService {
  constructor() { }

  explore(cqrsModules: any[]): CqrsOptions {
    const modules = [...cqrsModules];
    const commands = this.flatMap<ICommandHandler>(modules,
      instance => this.filterProvider(instance, COMMAND_HANDLER_METADATA),
    );
    const queries = this.flatMap<IQueryHandler>(modules,
      instance => this.filterProvider(instance, QUERY_HANDLER_METADATA),
    );
    const events = this.flatMap<IEventHandler>(modules,
      instance => this.filterProvider(instance, EVENTS_HANDLER_METADATA),
    );
    const sagas = this.flatMap(modules,
      instance => this.filterProvider(instance, SAGA_METADATA),
    );
    return { commands, queries, events, sagas };
  }

  flatMap<T>(
    modules: NgModule[],
    callback: (instance: any) => Type<any> | undefined,
  ): Type<T>[] {
    const items = modules
      .map(module => { // DecoratorFactory
        const annotations = module['__annotations__'];
        const providers = annotations[0].providers;
        return [...providers].map(callback);
      })
      .reduce((a, b) => a.concat(b), []);
    return items.filter(element => !!element) as Type<T>[];
  }

  filterProvider(
    wrapper: any,
    metadataKey: string,
  ): Type<any> | undefined {
    const instance = wrapper;
    if (!instance) {
      return undefined;
    }
    return this.extractMetadata(instance, metadataKey);
  }

  extractMetadata(instance: Object, metadataKey: string): Type<any> | undefined {
    if (!instance.constructor) {
      return;
    }
    const annotations = Reflect.getOwnMetadata(metadataKey, instance);
    const result = annotations ? (instance as Type<any>) : undefined;
    return result;
  }
}
