import { CommandHandler, ICommandHandler, EventPublisher } from '../../../../../../projects/ngx-cqrs/src/public-api';
import { RemoveTileCommand } from '../command/remove-tile.command';
import { TileAggregate } from '../../models/models';
import { RemoveTileEvent } from '../../events/events';

@CommandHandler(RemoveTileCommand)
export class RemoveTileHandler implements ICommandHandler<RemoveTileCommand> {

  constructor(private readonly publisher: EventPublisher) { }

  async execute(command: RemoveTileCommand) {

    console.log('RemoveTileCommand...');
    const { tileId } = command;
    let tile: TileAggregate;
  }
}
