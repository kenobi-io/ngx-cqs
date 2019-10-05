import { NgModule, ModuleWithProviders, Provider, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CommandBus } from './command-bus';
import { EventBus } from './event-bus';
import { EventPublisher } from './event-publisher';
import { QueryBus } from './query-bus';
import { ExplorerService } from './services/explorer.service';

// I define the shape of the optional configuration data passed to the forRoot() method.
export interface ModuleOptions {
  moduleType?: any;
  cqrsProviders: Provider[];
}

// I am the token that makes the raw options available to the following factory function.
// --
// NOTE: This value has to be exported otherwise the AoT compiler won't see it.
export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>('forRoot() ExplorerService configuration.');

// I translate the given raw OPTIONS into an instance of the MyServiceOptions TYPE. This
// will allows the MyService class to be instantiated and injected with a fully-formed
// configuration class instead of having to deal with the Inject() meta-data and a half-
// baked set of configuration options.
// --
// NOTE: This value has to be exported otherwise the AoT compiler won't see it.
export function createExplorerService(options: ModuleOptions[]) {

  // tslint:disable-next-line: no-use-before-declare
  CqrsModule.cqrsProviders = [];
  // TODO: add checking on exist handler name;
  // tslint:disable-next-line: no-use-before-declare
  options.forEach((option) => CqrsModule.cqrsProviders.push(...option.cqrsProviders));
  const explorerService = new ExplorerService();
  return (explorerService);
}

// @dynamic
@NgModule({
  imports: [CommonModule, BrowserModule],
  providers: [CommandBus, QueryBus, EventBus, EventPublisher, ExplorerService]
})
export class CqrsModule {

  static cqrsProviders: any[];

  constructor(private readonly explorerService: ExplorerService,
              private readonly eventsBus: EventBus,
              private readonly commandsBus: CommandBus,
              private readonly queryBus: QueryBus) {

    // tslint:disable-next-line: no-unused-expression
    const { events, queries, sagas, commands } = this.explorerService.explore(CqrsModule.cqrsProviders);
    this.eventsBus.register(events);
    this.commandsBus.register(commands);
    this.queryBus.register(queries);
    this.eventsBus.registerSagas(sagas);

  }

  public static forRoot(options: ModuleOptions[]): ModuleWithProviders {
    return {
      ngModule: CqrsModule,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options
        },
        {
          provide: ExplorerService,
          useFactory: createExplorerService,
          deps: [FOR_ROOT_OPTIONS_TOKEN]
        },
        CommandBus,
        QueryBus,
        EventBus,
        EventPublisher
      ]
    }
  }
}

