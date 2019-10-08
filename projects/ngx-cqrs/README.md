# Cqrs

using example: 
``` javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqrsModule } from 'ngx-cqrs';
import { cqrsProvidersOneMyCqrsModule } from '../features/my-module/my-module.module';
import { cqrsProvidersTwoMyCqrsModule } from '../features/my-module/my-module-2.module';

@NgModule({
  imports: [
    CommonModule,
    CqrsModule.forRoot([      
      {moduleType: OneMyCqrsModule, cqrsProviders: cqrsProvidersOneMyCqrsModule },
      {moduleType: TwoMyCqrsModule, cqrsProviders: cqrsProvidersTwoMyCqrsModule }
      ]),
    OneMyCqrsModule,
    TwoMyCqrsModule
  ]
})
export class SharedModule { }

/// my-module.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqrsModule } from 'ngx-cqrs';
import { sagas } from './sagas/sagas';
import { commandHandlers } from './commands/commandes';
import { QueryHandler } from './queries/handler/query.handler';
const queryHandlers = [QueryHandler];

export const cqrsProvidersOneMyCqrsModule = [...commandHandlers,...queryHandlers,...sagas]

@NgModule({
  imports: [
    CommonModule,
    CqrsModule,],
  providers: [
     ...commandHandlers,
     ...queryHandlers,
     ...sagas]
})
export class OneMyCqrsModule { }

/// my-module.module-2.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqrsModule } from 'ngx-cqrs';
import { sagas } from './sagas/sagas';
import { commandHandlers } from './commands/commandes';
import { QueryHandler } from './queries/handler/query.handler';
const queryHandlers = [QueryHandler];

export const cqrsProvidersTwoMyCqrsModule = [...commandHandlers,...queryHandlers,...sagas]

@NgModule({
  imports: [
    CommonModule,
    CqrsModule,],
  providers: [
     ...commandHandlers,
     ...queryHandlers,
     ...sagas]
})
export class TwoMyCqrsModule { }
```

How create cqrs elements you can learn in https://docs.nestjs.com/recipes/cqrs
git example - https://github.com/kamilmysliwiec/nest-cqrs-example
