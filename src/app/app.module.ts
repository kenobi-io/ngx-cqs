import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CqrsModule, } from '../../projects/ngx-cqrs/src/public-api';
import { cqrsProviders } from './features/tile/tile.module';

// const export allCqrsProviders = []

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CqrsModule.forRoot([...cqrsProviders])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
