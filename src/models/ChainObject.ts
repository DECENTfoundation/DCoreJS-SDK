import * as ByteBuffer from "bytebuffer";
import { ObjectType } from "./ObjectType";

export class ChainObject {
    public static parse(id: string): ChainObject {
        if (this.regexp.test(id)) {
            return new ChainObject(id);
        } else {
            throw TypeError("not a valid chain id");
        }
    }

    private static regexp: RegExp = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/;

    public objectType: ObjectType;
    public instance: number;
    public fullBytes: Buffer;

    private constructor(public objectId: string) {
        const group = ChainObject.regexp.exec(objectId);
        this.objectType = ObjectType.types[+group[1]][+group[2]];
        this.instance = +group[3];
        this.fullBytes = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN).writeUint64(this.instance).reset().skip(6)
            .writeByte(this.objectType.type).writeByte(this.objectType.space).buffer;
    }
}
