import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';
import { EventPublisher } from './event-publisher';
import { QueryBus } from './query-bus';
import { ExplorerService } from './services/explorer.service';
import { PlatformService } from './services/platform.service';

export function createExplorerService(providers) {
  // tslint:disable-next-line: no-use-before-declare
  CqrsModule.providers = providers;
  return new ExplorerService();
}

// @dynamic
@NgModule({
  imports: [CommonModule, BrowserModule],
  providers: [CommandBus, QueryBus, EventBus, EventPublisher, ExplorerService]
})
export class CqrsModule {

  static providers: any[];

  constructor(private readonly explorerService: ExplorerService,
              private readonly eventsBus: EventBus,
              private readonly commandsBus: CommandBus,
              private readonly queryBus: QueryBus) {

    // tslint:disable-next-line: no-unused-expression
    CqrsModule.providers && Array.from(CqrsModule.providers).forEach((provider) => {
      const { events, queries, sagas, commands } = this.explorerService.explore(provider);
      this.eventsBus.register(events);
      this.commandsBus.register(commands);
      this.queryBus.register(queries);
      this.eventsBus.registerSagas(sagas);
    });

  }

  public static forRoot(providers: any[]): ModuleWithProviders {
    return {
      ngModule: CqrsModule,
      providers: [
        {
          provide: ExplorerService,
          useFactory: createExplorerService,
          deps: [providers]
        },
        CommandBus,
        QueryBus,
        EventBus,
        EventPublisher
      ]
    }
  }
}

