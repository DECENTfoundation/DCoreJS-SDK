import { NftDataType } from "../../src/models/NftDataType";
import { NftFieldType } from "../../src/models/NftFieldType";
import { NftModifiableBy } from "../../src/models/NftModifiableBy";

export class NftApple {
    public static DEFINITION: NftDataType[] = [
        new NftDataType(NftFieldType.Integer),
        new NftDataType(NftFieldType.String, true),
        new NftDataType(NftFieldType.Boolean, false, NftModifiableBy.Both, "eaten"),
    ];

    public static create(values: object[]): NftApple {
        return new NftApple(Number(values[0]), String(values[1]), Boolean(values[2]));
    }

    constructor(
        public readonly size: number,
        public readonly color: string,
        public eaten: boolean,
    ) {
    }
}
