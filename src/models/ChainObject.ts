export class ChainObject {

    public static parse(id: string): ChainObject {
        if (this.regexp.test(id)) {
            return new ChainObject(id);
        } else {
            throw TypeError("not a valid chain id");
        }
    }

    private static regexp: RegExp = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/;

    public instance: number;

    private constructor(public objectId: string) {
        this.instance = +ChainObject.regexp.exec(objectId)[2];
    }
}
