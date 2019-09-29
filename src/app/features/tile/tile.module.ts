import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CqrsModule } from '../../../../projects/ngx-cqrs/src/public-api';
import { services } from './services/services';
import { sagas } from './sagas/sagas';
import { tileComponents, tileDirectives } from './components/components';
import { commandHandlers } from './commands/commandes';
import { storeProviders } from './stores/stores';
import { GetCategoriesTileHandler } from './queries/handler/categories-tile.handler';
import { GetTilesForCategoryQueryHandler } from './queries/handler/get-tiles-for-category.handler';
import { GetAllTilesQueryHandler } from './queries/handler/get-all-tiles.handler';


const queryHandlers = [GetCategoriesTileHandler, GetTilesForCategoryQueryHandler, GetAllTilesQueryHandler];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CqrsModule],
  declarations: [...tileComponents, ...tileDirectives],
  entryComponents: [...tileComponents],
  exports: [...tileComponents],
  providers: [
    ...services,
    ...commandHandlers,
    ...queryHandlers,
    ...sagas,
    ...storeProviders]
})
export class TileModule { }
