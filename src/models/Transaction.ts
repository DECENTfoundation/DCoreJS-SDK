import { classToPlain, Exclude, Expose, Transform } from "class-transformer";
import { Moment } from "moment";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { Serializer } from "../net/serialization/Serializer";
import { Utils } from "../utils/Utils";
import { BlockData } from "./BlockData";
import { BaseOperation } from "./operation/BaseOperation";

export class Transaction {
    @Exclude()
    public blockData: BlockData;

    @Transform((values: any[], obj: Transaction) => obj.operations.map((op) => [op.type, classToPlain(op)]))
    @Expose({ name: "operations" })
    public operations: BaseOperation[];

    @Expose({ name: "signatures" })
    public signatures: string[];

    @Expose({ name: "expiration" })
    @Transform((value: any, obj: Transaction) => obj.expiration.utc().format("YYYY-MM-DDTHH:mm:ss"), { toPlainOnly: true })
    public expiration: Moment;

    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: number;

    @Expose({ name: "extensions" })
    public extensions: any[] = [];

    @Exclude()
    private readonly chainId: Buffer;

    constructor(blockData: BlockData, ops: BaseOperation[], chainId: string) {
        this.blockData = blockData;
        this.operations = ops;
        this.chainId = new Buffer(Utils.Base16.decode(chainId));
        this.refBlockNum = this.blockData.refBlockNum;
        this.refBlockPrefix = this.blockData.refBlockPrefix;
        this.expiration = this.blockData.expiration;
    }

    public sign(key: ECKeyPair): Transaction {
        const serializer = new Serializer();

        let sig: string;
        do {
            // increment expiration until we get dcore valid signature
            this.blockData.expiration = this.blockData.expiration.add(1, "second");
            this.expiration = this.blockData.expiration;
            const data = serializer.serialize(this);
            sig = key.sign(Buffer.concat([this.chainId, data.buffer]));
        } while (!sig);

        this.signatures = [sig];
        return this;
    }
}
