import { NgModule, ModuleWithProviders, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';
import { EventPublisher } from './event-publisher';
import { QueryBus } from './query-bus';
import { ExplorerService } from './services/explorer.service';

export function createExplorerService (modules) {
  // tslint:disable-next-line: no-use-before-declare
  CqrsModule.modules = modules;
  return new ExplorerService(CqrsModule.platform);
}

// @dynamic
@NgModule({
  imports: [CommonModule, BrowserModule],
  providers: [CommandBus, QueryBus, EventBus, EventPublisher, ExplorerService]
})
export class CqrsModule {

  static modules: any[];
  // tslint:disable-next-line: ban-types
  static platform: Object;

  // tslint:disable-next-line: ban-types
  constructor(@Inject(PLATFORM_ID) private readonly platform: Object,
              private readonly explorerService: ExplorerService,
              private readonly eventsBus: EventBus,
              private readonly commandsBus: CommandBus,
              private readonly queryBus: QueryBus) {

      CqrsModule.platform = this.platform;
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
          deps: [modules]
        },
        CommandBus,
        QueryBus,
        EventBus,
        EventPublisher
      ]
    }
  }
}

