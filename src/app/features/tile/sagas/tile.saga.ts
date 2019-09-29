
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { RemoveTileEvent } from '../events/event/remove-tile.event';
import { GetCategoriesTileQuery } from '../queries/query/categories-tile.query';
import { ICommand, Saga, ofType } from '../../../../../projects/ngx-cqrs/src/public-api';
import { Injectable } from '@angular/core';

const itemId = '0';

@Injectable()
export class TileSaga {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(RemoveTileEvent),
        // delay(1000),
        map(event => {
          console.log('Inside [TileSaga] Saga');
          // return new DropAncientItemCommand(event.id, itemId);
          return new GetCategoriesTileQuery();
        }),
      );
  }
}
