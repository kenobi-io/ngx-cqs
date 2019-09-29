export * from './event/add-tile.event';
export * from './event/found-tile.event';
export * from './event/remove-tile.event';

import { RemoveTileHandler } from './handler/remove-tile.handler';
import { FoundTileHandler } from './handler/found-tile.handler';

export const eventHandlers = [RemoveTileHandler, FoundTileHandler];