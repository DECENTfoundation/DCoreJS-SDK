import { classToPlain, Exclude, Expose, Transform } from "class-transformer";
import * as _ from "lodash";
import * as Long from "long";
import { Moment } from "moment";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { OperationsToClass } from "../net/adapter/OperationAdapter";
import { LongToClass, LongToPlain, MomentToClass, MomentToPlain } from "../net/adapter/TypeAdapters";
import { Serializer } from "../net/serialization/Serializer";
import { assertThrow } from "../utils/Utils";
import { BlockData } from "./BlockData";
import { BaseOperation } from "./operation/BaseOperation";

export class Transaction {

    public static create(blockData: BlockData, ops: BaseOperation[], chainId: string): Transaction {
        const trx = new Transaction();
        trx.operations = ops;
        trx.chainId = chainId;
        trx.refBlockNum = blockData.refBlockNum;
        trx.refBlockPrefix = blockData.refBlockPrefix;
        trx.expiration = blockData.expiration;
        return trx;
    }

    @OperationsToClass
    @Transform((values: any[], obj: Transaction) => obj.operations.map((op) => [op.type, classToPlain(op)]), { toPlainOnly: true })
    @Expose({ name: "operations" })
    public operations: BaseOperation[];

    @Expose({ name: "signatures" })
    public signatures?: string[];

    @MomentToClass
    @MomentToPlain
    @Expose({ name: "expiration" })
    public expiration: Moment;

    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    @LongToClass
    @LongToPlain
    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: Long;

    @Expose({ name: "extensions" })
    public extensions: any[] = [];

    @Exclude()
    public chainId: string;

    /**
     * Generate signature on transaction data. May return undefined if the signature is not valid for DCore.
     *
     * @param key private key
     * @param chainId id of the DCore chain, different for live/testnet/custom net...
     */
    public signature(key: ECKeyPair, chainId: string = this.chainId): string | undefined {
        assertThrow(!_.isNil(chainId), () => "chain id must be set on signing");

        const serializer = new Serializer();
        const chainBytes = Buffer.from(chainId, "hex");

        const data = serializer.serialize(this);
        const sig = key.sign(Buffer.concat([chainBytes, data]));
        return sig;
    }

    /**
     * Set a single signature to transaction and return it. May change expiration time to meet valid signature checks for DCore.
     *
     * @param key private key
     * @param chainId id of the DCore chain, different for live/testnet/custom net...
     */
    public withSignature(key: ECKeyPair, chainId: string = this.chainId): Transaction {
        assertThrow(!_.isNil(chainId), () => "chain id must be set on signing");

        let sig: string | undefined;
        do {
            // increment expiration until we get dcore valid signature
            this.expiration = this.expiration.add(1, "second");
            sig = this.signature(key, chainId);
        } while (!sig);

        // console.log(serializer.serialize(this).toString("hex"));
        this.signatures = [sig];
        return this;
    }
}
