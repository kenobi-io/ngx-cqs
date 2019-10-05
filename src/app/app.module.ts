import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CqrsModule, } from '../../projects/ngx-cqrs/src/public-api';
import { queryHandlers, TileModule } from './features/tile/tile.module';
import { commandHandlers } from './features/tile/commands/commandes';
import { sagas } from './features/tile/sagas/sagas';
import { eventHandlers } from './features/tile/events/events';

export const allCqrsProviders = [...eventHandlers, ...commandHandlers, ...queryHandlers, ...sagas];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TileModule,
    CqrsModule.forRoot([
      {moduleType: TileModule, cqrsProviders: allCqrsProviders },
      {moduleType: TileModule, cqrsProviders: allCqrsProviders }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
