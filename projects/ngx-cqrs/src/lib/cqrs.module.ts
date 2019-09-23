import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';
import { EventPublisher } from './event-publisher';
import { QueryBus } from './query-bus';
import { ExplorerService } from './services/explorer.service';

export function createExplorerService() {
  return new ExplorerService();
}

// @dynamic
@NgModule({
  imports: [CommonModule, BrowserModule], 
  providers: [CommandBus, QueryBus, EventBus, EventPublisher, ExplorerService]
})
export class CqrsModule {

  static modules: any[];

  constructor(
    private readonly explorerService: ExplorerService,
    private readonly eventsBus: EventBus,
    private readonly commandsBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { 
    console.log('modules', CqrsModule.modules);
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
          useFactory: function () {

            CqrsModule.modules = modules;
            return new ExplorerService();
          },
          deps: []
        },
        CommandBus,
        QueryBus,
        EventBus,
        EventPublisher
      ]
    }
  }
}
