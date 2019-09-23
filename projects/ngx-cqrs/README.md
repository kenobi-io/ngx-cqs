# Cqrs

using example: 
``` javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqrsModule } from 'ngx-cqrs';
import { MyModule } from '../features/my-module/my-module.module';

@NgModule({
  imports: [
    CommonModule,
    CqrsModule.forRoot([MyModule]),
    MyModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CqrsModule } from 'ngx-cqrs';
import { sagas } from './sagas/sagas';
import { commandHandlers } from './commands/commandes';
import { QueryHandler } from './queries/handler/query.handler';
const queryHandlers = [QueryHandler];

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
