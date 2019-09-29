import { QueryHandler, IQueryHandler } from '../../../../../../projects/ngx-cqrs/src/public-api';
import { GetCategoriesTileQuery } from '../query/categories-tile.query';

@QueryHandler(GetCategoriesTileQuery)
export class GetCategoriesTileHandler 
       implements IQueryHandler<GetCategoriesTileQuery> {

  constructor() { }

  async execute(query: GetCategoriesTileQuery): Promise<[]> {
    console.log('GetTilesQuery...');
    let url = '/tile';
    if(query.id){
      url = url + query.id;
    }
    return await [];
  }
}
