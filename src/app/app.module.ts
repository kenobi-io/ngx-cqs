import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CqrsModule } from 'projects/ngx-cqrs/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CqrsModule.forRoot([AppModule])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
