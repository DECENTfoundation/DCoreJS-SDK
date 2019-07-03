export enum NftModifiableBy {
    Nobody = "nobody",
    Issuer = "issuer",
    Owner = "owner",
    Both = "both",
}

export const NFT_MOD_BY_IDX: Map<NftModifiableBy, number> = new Map([
        [NftModifiableBy.Nobody, 0],
        [NftModifiableBy.Issuer, 1],
        [NftModifiableBy.Owner, 2],
        [NftModifiableBy.Both, 3],
    ],
);
