export class GetTilesForCategoryQuery {

    public id: string;
    public name: string;
    public route: string;

    constructor(source?) {
        Object.assign(this, source);
    }
}