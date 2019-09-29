// queries
import { GetTilesForCategoryQuery } from './query/get-tiles-for-category.query';
import { GetCategoriesTileQuery } from './query/categories-tile.query';
import { GetAllTilesQuery } from './query/get-all-tiles.query';

// handlers
// import { GetTilesQueryHandler } from './handler/get-tiles.handler';
// import { GetTilesForCategoryQueryHandler } from './handler/get-tiles-for-category.handler';
// import { GetAllTilesQueryHandler } from './handler/get-all-tiles.handler';

// queries
export { GetCategoriesTileQuery } from './query/categories-tile.query';
export { GetTilesForCategoryQuery } from './query/get-tiles-for-category.query';
export { GetAllTilesQuery } from './query/get-all-tiles.query';


export const queries = [GetCategoriesTileQuery, GetTilesForCategoryQuery, GetAllTilesQuery];
