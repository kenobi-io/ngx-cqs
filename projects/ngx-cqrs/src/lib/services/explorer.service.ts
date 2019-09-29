import { Injectable, NgModule, Type, Inject, PLATFORM_ID } from '@angular/core';
import {
  COMMAND_HANDLER_METADATA,
  EVENTS_HANDLER_METADATA,
  QUERY_HANDLER_METADATA,
  SAGA_METADATA,
} from '../decorators/constants';
import { ICommandHandler, IEventHandler, IQueryHandler } from '../interfaces';
import { CqrsOptions } from '../interfaces/cqrs-options.interface';
import 'reflect-metadata';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ExplorerService {
  // tslint:disable-next-line: ban-types
  constructor(@Inject(PLATFORM_ID) private platform: Object) { }

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

    if (isPlatformBrowser(this.platform)) {
      const items = modules
        .map((ngModule: NgModule) => {

          const CustomModule = ngModule.constructor as typeof NgModule;
          const annotations = ngModule['__annotations__'];

          if (annotations && annotations[0] && annotations[0].providers) {

            const providers = annotations[0].providers;
            return [...providers].map(callback);

          } else {

            const meta = Reflect.getOwnMetadata('__annotations__', ngModule);

            if (meta && meta[0] && meta[0].providers) {

              const providers = meta[0].providers;
              return [...providers].map(callback);

            } else if (CustomModule
                       && CustomModule.prototype
                       && CustomModule.prototype.ngInjectorDef
                       && CustomModule.prototype.ngInjectorDef.providers) {

              const providers = CustomModule.prototype.ngInjectorDef.providers;
              return [...providers].map(callback);
            }
          }
        })
        .reduce((a, b) => a.concat(b), []);
      return items.filter(element => !!element) as Type<T>[];
    }
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
