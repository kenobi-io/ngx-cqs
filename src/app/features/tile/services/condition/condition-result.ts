export class ConditionResult {

    public data;
    public model;
    public component;

    constructor(source?) {
        if (source) {
            Object.assign(this, source);
        }
    }
}