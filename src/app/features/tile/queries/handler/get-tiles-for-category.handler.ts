import { QueryHandler, IQueryHandler } from '../../../../../../projects/ngx-cqrs/src/public-api';
import { GetTilesForCategoryQuery } from '../query/get-tiles-for-category.query';

@QueryHandler(GetTilesForCategoryQuery)
export class GetTilesForCategoryQueryHandler
  implements IQueryHandler<GetTilesForCategoryQuery> {

  constructor() { }

  async execute(query: GetTilesForCategoryQuery): Promise<[]> {
    console.log('GetTilesForCategoryQuery...');
    let url = '/tile';
    if (query.route) {
      url = url + `${query.route}`;
    }
    return await [];
  }
}
