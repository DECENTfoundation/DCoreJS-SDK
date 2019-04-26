import * as ByteBuffer from "bytebuffer";
import * as _ from "lodash";
import * as Long from "long";
import { ObjectType } from "./ObjectType";

export class ChainObject {
    public static parse(id: string): ChainObject {
        if (this.isValid(id)) {
            return new ChainObject(id);
        } else {
            throw TypeError("not a valid chain id:" + id);
        }
    }

    public static isValid(id: string): boolean {
        return ChainObject.regexp.test(id);
    }

    private static regexp: RegExp = /^([0-9]+)\.([0-9]+)\.([0-9]+)(\.([0-9]+))?$/;

    public readonly objectType: ObjectType;
    public readonly instance: Long = Long.fromNumber(0);
    public readonly fullBytes: Buffer = Buffer.alloc(0);
    public readonly objectId: string;

    public constructor(objectId: string | ObjectType) {
        if (typeof objectId === "string") {
            const group = ChainObject.regexp.exec(objectId);
            this.objectType = ObjectType.types[+group![1]][+group![2]];
            this.instance = Long.fromString(group![3], true);
            this.objectId = objectId;
            this.fullBytes = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN)
            // @ts-ignore fails on instance of Long, force a string
                .writeUint64(this.instance.toString()).reset().skip(6)
                .writeByte(this.objectType.type).writeByte(this.objectType.space).buffer;
        } else {
            this.objectType = objectId;
            this.objectId = this.objectType.space + "." + this.objectType.type + "." + this.instance;
        }
    }

    public eq(other?: ChainObject): boolean {
        return !_.isNil(other) && this.objectId === other.objectId;
    }
}
