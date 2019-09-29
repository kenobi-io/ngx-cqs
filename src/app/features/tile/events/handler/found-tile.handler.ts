import { IEventHandler, EventsHandler } from '../../../../../../projects/ngx-cqrs/src/public-api';
import { FoundTileEvent } from '../event/found-tile.event';

@EventsHandler(FoundTileEvent)
export class FoundTileHandler
       implements IEventHandler<FoundTileEvent> {

  handle(event: FoundTileEvent) {
    console.log('Async FoundTileEvent...');
  }
}
