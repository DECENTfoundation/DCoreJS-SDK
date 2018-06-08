export class ChainObject {

    public static parse(id: string): ChainObject {
        return new ChainObject(id);
    }

    constructor(public objectId: string) {
    }
}
