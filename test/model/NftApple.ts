import { NftDataType } from "../../src/models/NftDataType";
import { NftFieldType } from "../../src/models/NftFieldType";
import { NftModifiableBy } from "../../src/models/NftModifiableBy";

export class NftApple {
    public static DEFINITION: NftDataType[] = [
        new NftDataType(NftFieldType.Integer, false, NftModifiableBy.Nobody, "size"),
        new NftDataType(NftFieldType.String, true, NftModifiableBy.Nobody, "color"),
        new NftDataType(NftFieldType.Boolean, false, NftModifiableBy.Both, "eaten"),
    ];

    public static create(values: any[]): NftApple {
        return new NftApple(values[0], values[1], values[2]);
    }

    constructor(
        public readonly size: number,
        public readonly color: string,
        public eaten: boolean,
    ) {
    }

    public get values(): any[] {
        return [this.size, this.color, this.eaten];
    }
}
