import { QueryHandler, IQueryHandler } from '../../../../../../projects/ngx-cqrs/src/public-api';
import { GetAllTilesQuery } from '../query/get-all-tiles.query';
import { GetCategoriesTileQuery } from '../query/categories-tile.query';

@QueryHandler(GetAllTilesQuery)
export class GetAllTilesQueryHandler 
       implements IQueryHandler<GetAllTilesQuery> {

  constructor() { }

  async execute(query: GetCategoriesTileQuery): Promise<[]> {
    console.log('GetAllTilesQuery...');
    let url = '/tile/all';
    return await [];
  }
}