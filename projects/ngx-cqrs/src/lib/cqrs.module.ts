import { NgModule, ModuleWithProviders, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';
import { EventPublisher } from './event-publisher';
import { QueryBus } from './query-bus';
import { ExplorerService } from './services/explorer.service';
import { PlatformService } from './services/platform.service';

export function createExplorerService (modules, platformService: PlatformService) {
  // tslint:disable-next-line: no-use-before-declare
  CqrsModule.modules = modules;
  return new ExplorerService(platformService);
}

// @dynamic
@NgModule({
  imports: [CommonModule, BrowserModule],
  providers: [CommandBus, QueryBus, EventBus, EventPublisher, PlatformService, ExplorerService]
})
export class CqrsModule {

  static modules: any[];

  // tslint:disable-next-line: ban-types
  constructor(private readonly explorerService: ExplorerService,
              private readonly eventsBus: EventBus,
              private readonly commandsBus: CommandBus,
              private readonly queryBus: QueryBus) {

      const { events, queries, sagas, commands } = this.explorerService.explore(CqrsModule.modules);
      this.eventsBus.register(events);
      this.commandsBus.register(commands);
      this.queryBus.register(queries);
      this.eventsBus.registerSagas(sagas);

  }

  public static forRoot(modules: any[]): ModuleWithProviders {
    return {
      ngModule: CqrsModule,
      providers: [
        {
          provide: ExplorerService,
          useFactory: createExplorerService,
          deps: [modules, PlatformService]
        },
        CommandBus,
        QueryBus,
        EventBus,
        EventPublisher
      ]
    }
  }
}

