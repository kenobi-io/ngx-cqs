# Cqrs

using example: 
``` javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqrsModule } from 'projects/ngx-cqrs/src/public-api';
import { cqrsProvidersMyModule } from '../features/my-module/my-module.module';
import { cqrsProvidersMyModule2 } from '../features/my-module/my-module-2.module';

@NgModule({
  imports: [
    CommonModule,
    CqrsModule.forRoot([...cqrsProvidersMyModule, ...cqrsProvidersMyModule2]),
    MyModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqrsModule } from 'projects/ngx-cqrs/src/public-api';
import { sagas } from './sagas/sagas';
import { commandHandlers } from './commands/commandes';
import { QueryHandler } from './queries/handler/query.handler';
const queryHandlers = [QueryHandler];

export const cqrsProvidersMyModule = [...commandHandlers,...queryHandlers,...sagas]

@NgModule({
  imports: [
    CommonModule,
    CqrsModule,],
  providers: [
     ...commandHandlers,
     ...queryHandlers,
     ...sagas]
})
export class MyModule { }
```

How create cqrs elements you can learn in https://docs.nestjs.com/recipes/cqrs
git example - https://github.com/kamilmysliwiec/nest-cqrs-example
