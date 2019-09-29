import { IEventHandler, EventsHandler } from '../../../../../../projects/ngx-cqrs/src/public-api';
import { RemoveTileEvent } from '../event/remove-tile.event';

@EventsHandler(RemoveTileEvent)
export class RemoveTileHandler
       implements IEventHandler<RemoveTileEvent> {

  handle(event: RemoveTileEvent) {
    console.log('RemoveTileHandler...');
  }
}
