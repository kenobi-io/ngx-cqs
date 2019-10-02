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
import { PlatformService } from './platform.service';

@Injectable()
export class ExplorerService {

  constructor(private platformService: PlatformService) { }

  explore(cqrsModules: any[]): CqrsOptions {

    const modules: any[] = cqrsModules && [...cqrsModules] || [];
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

    // if (isPlatformBrowser(this.platformService.platform)) {
    const items = modules
      .map((ngModule: NgModule) => {

        const CustomModule = ngModule.constructor as typeof NgModule;
        const annotations = ngModule['__annotations__'];

        if (annotations && annotations[0] && annotations[0].providers) {

          const providers = annotations[0].providers;
          return [...providers].map(callback);

        } else {

          // const meta = Reflect.getOwnMetadata('__annotations__', CustomModule);
          let meta = Reflect.getOwnPropertyDescriptor(CustomModule, '__annotations__');
          meta = meta && meta.value;
          if (meta && meta[0] && meta[0].providers) {

            const providers = meta[0].providers;
            return [...providers].map(callback);

          } else if (CustomModule
            && (CustomModule as any).ngInjectorDef
            && (CustomModule as any).ngInjectorDef.providers) {

            const providers = (CustomModule as any).ngInjectorDef.providers;
            return [...providers].map(callback);
          }
        }
      })
      .reduce((a, b) => a.concat(b), []);
    return items.filter(element => !!element) as Type<T>[];
    // }
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
