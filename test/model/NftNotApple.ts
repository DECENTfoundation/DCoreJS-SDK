import { NftDataType } from "../../src/models/NftDataType";
import { NftFieldType } from "../../src/models/NftFieldType";
import { NftModifiableBy } from "../../src/models/NftModifiableBy";

export class NftNotApple {
    public static DEFINITION: NftDataType[] = [
        new NftDataType(NftFieldType.Boolean, false, NftModifiableBy.Both, "eaten"),
        new NftDataType(NftFieldType.Integer, false, NftModifiableBy.Nobody, "size"),
        new NftDataType(NftFieldType.String, true, NftModifiableBy.Nobody, "color"),
    ];

    public static create(values: any[]): NftNotApple {
        return new NftNotApple(values[0], values[1], values[2]);
    }

    constructor(
        public eaten: boolean,
        public readonly size: number,
        public readonly color: string,
    ) {
    }

    public get values(): any[] {
        return [this.eaten, this.size, this.color];
    }
}
