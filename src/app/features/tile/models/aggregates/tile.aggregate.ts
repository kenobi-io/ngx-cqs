import { AggregateRoot } from '../../../../../../projects/ngx-cqrs/src/public-api';


export class TileAggregate extends AggregateRoot {

    constructor(private readonly id: string) {
        super();
    }
}