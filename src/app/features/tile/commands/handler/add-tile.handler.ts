import { CommandHandler, ICommandHandler, EventPublisher } from '../../../../../../projects/ngx-cqrs/src/public-api';
import { AddTileCommand } from '../command/add-tile.command';
import { TileAggregate } from '../../models/models';
import { AddTileEvent } from '../../events/events';

@CommandHandler(AddTileCommand)
export class AddTileHandler implements ICommandHandler<AddTileCommand> {

  constructor(private readonly publisher: EventPublisher) { }

  async execute(command: AddTileCommand) {

    console.log('Async AddTileCommand...');
    let tile: TileAggregate;
  }
}
