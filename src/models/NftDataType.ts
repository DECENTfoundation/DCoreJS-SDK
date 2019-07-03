import { Expose } from "class-transformer";
import { NftFieldType } from "./NftFieldType";
import { NftModifiableBy } from "./NftModifiableBy";

export class NftDataType {
    @Expose({ name: "type" })
    public readonly type: NftFieldType;

    @Expose({ name: "unique" })
    public readonly unique: boolean;

    @Expose({ name: "modifiable" })
    public readonly modifiable: NftModifiableBy;

    @Expose({ name: "name" })
    public readonly name?: string;

    constructor(type: NftFieldType = NftFieldType.String, unique: boolean = false, modifiable: NftModifiableBy = NftModifiableBy.Nobody, name?: string) {
        this.type = type;
        this.unique = unique;
        this.modifiable = modifiable;
        this.name = name;
    }
}
