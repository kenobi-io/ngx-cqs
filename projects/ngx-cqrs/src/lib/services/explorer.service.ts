import 'reflect-metadata';
import { Injectable, NgModule, Type } from '@angular/core';
import {
  COMMAND_HANDLER_METADATA,
  EVENTS_HANDLER_METADATA,
  QUERY_HANDLER_METADATA,
  SAGA_METADATA,
} from '../decorators/constants';
import { ICommandHandler, IEventHandler, IQueryHandler } from '../interfaces';
import { CqrsOptions } from '../interfaces/cqrs-options.interface';
@Injectable()
export class ExplorerService {

  constructor() { }

  explore(cqrsProviders: any[]): CqrsOptions {

    const providers: any[] = cqrsProviders && [...cqrsProviders] || [];
    const commands = this.flatMap<ICommandHandler>(providers,
      instance => this.filterProvider(instance, COMMAND_HANDLER_METADATA),
    );
    const queries = this.flatMap<IQueryHandler>(providers,
      instance => this.filterProvider(instance, QUERY_HANDLER_METADATA),
    );
    const events = this.flatMap<IEventHandler>(providers,
      instance => this.filterProvider(instance, EVENTS_HANDLER_METADATA),
    );
    const sagas = this.flatMap(providers,
      instance => this.filterProvider(instance, SAGA_METADATA),
    );
    return { commands, queries, events, sagas };
  }

  flatMap<T>(providers: any[],
             callback: (instance: any) => Type<any> | undefined): Type<T>[] {
    const items = [...providers].map(callback).reduce((a, b) => a.concat(b), []);
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
