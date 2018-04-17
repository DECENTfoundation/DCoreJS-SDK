import { ByteSerializable } from "../net/models/ByteSerializable";

export class ChainObject implements ByteSerializable {

    constructor(id: string) {

    }

    public get bytes(): Buffer {
        return null;
    }
}
