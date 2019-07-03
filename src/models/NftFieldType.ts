export enum NftFieldType {
    String = "string",
    Integer = "integer",
    Boolean = "boolean",
}

export const NFT_FIELD_IDX: Map<NftFieldType, number> = new Map([
        [NftFieldType.String, 0],
        [NftFieldType.Integer, 1],
        [NftFieldType.Boolean, 2],
    ],
);

export const NFT_FIELD_NAME: Map<string, NftFieldType> = new Map([
        ["String", NftFieldType.String],
        ["Number", NftFieldType.Integer],
        ["Boolean", NftFieldType.Boolean],
    ],
);
