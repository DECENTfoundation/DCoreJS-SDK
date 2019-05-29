import * as ByteBuffer from "bytebuffer";
import { ObjectType } from "./ObjectType";

export class ChainObject {
    public static parse(id: string): ChainObject {
        if (ChainObject.regexp.test(id)) {
            return new ChainObject(id);
        } else {
            throw TypeError("not a valid chain id:" + id);
        }
    }

    private static regexp: RegExp = /^([0-9]+)\.([0-9]+)\.([0-9]+)(\.([0-9]+))?$/;

    public readonly objectType: ObjectType;
    public readonly instance: number = 0;
    public readonly fullBytes: Buffer = Buffer.alloc(0);
    public readonly objectId: string;

    public constructor(objectId: string | ObjectType) {
        if (typeof objectId === "string") {
            const group = ChainObject.regexp.exec(objectId);
            this.objectType = ObjectType.getType(+group![1], +group![2]);
            this.instance = +group[3];
            this.objectId = objectId;
            this.fullBytes = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN).writeUint64(this.instance).reset().skip(6)
                .writeByte(this.objectType.type).writeByte(this.objectType.space).buffer;
        } else {
            this.objectType = objectId;
            this.objectId = this.objectType.space + "." + this.objectType.type + "." + this.instance;
        }
    }

    public eq(other: ChainObject): boolean {
        return this.objectId === other.objectId;
    }
}
