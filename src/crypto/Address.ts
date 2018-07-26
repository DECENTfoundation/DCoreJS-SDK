export class Address {

    private static PREFIX: string = "DCT";

    private readonly encoded: string;

    constructor(encoded: string) {
        this.encoded = encoded;
    }

    public toString(): string {
        return this.encode();
    }

    public encode(): string {
        return this.encoded;
    }

    /*
        constructor(
            public publicKey: ECPoint,
            private prefix: string = Address.PREFIX,
        ) { }

    */
}
