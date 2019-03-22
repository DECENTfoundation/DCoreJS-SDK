import { classToPlain, Exclude, Expose, Transform } from "class-transformer";
import * as Long from "long";
import { Moment } from "moment";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { Serializer } from "../net/serialization/Serializer";
import { LongToPlain, MomentToPlain } from "../utils/TypeAdapters";
import { BlockData } from "./BlockData";
import { BaseOperation } from "./operation/BaseOperation";

export class Transaction {
    @Exclude()
    public blockData: BlockData;

    @Transform((values: any[], obj: Transaction) => obj.operations.map((op) => [op.type, classToPlain(op)]), { toPlainOnly: true })
    @Expose({ name: "operations" })
    public operations: BaseOperation[];

    @Expose({ name: "signatures" })
    public signatures?: string[];

    @MomentToPlain
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    @LongToPlain
    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: Long;

    @Expose({ name: "extensions" })
    public extensions: any[] = [];

    @Exclude()
    private readonly chainId: Buffer;

    constructor(blockData: BlockData, ops: BaseOperation[], chainId: string) {
        this.blockData = blockData;
        this.operations = ops;
        this.chainId = Buffer.from(chainId, "hex");
        this.refBlockNum = this.blockData.refBlockNum;
        this.refBlockPrefix = this.blockData.refBlockPrefix;
        this.expiration = this.blockData.expiration;
    }

    public withSignature(key: ECKeyPair): Transaction {
        const serializer = new Serializer();

        let sig: string | undefined;
        do {
            // increment expiration until we get dcore valid signature
            this.blockData.expiration = this.blockData.expiration.add(1, "second");
            this.expiration = this.blockData.expiration;
            const data = serializer.serialize(this);
            sig = key.sign(Buffer.concat([this.chainId, data]));
        } while (!sig);

        this.signatures = [sig];
        return this;
    }
}
