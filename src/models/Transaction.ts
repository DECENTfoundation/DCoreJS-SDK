import * as ByteBuffer from "bytebuffer";
import { classToPlain, Exclude, Expose, Transform } from "class-transformer";
import * as _ from "lodash";
import { Duration, Moment } from "moment";
import { ECKeyPair } from "../crypto/ECKeyPair";
import { DCoreConstants } from "../DCoreConstants";
import { OperationsToClass } from "../net/adapter/OperationAdapter";
import { MomentToClass, MomentToPlain } from "../net/adapter/TypeAdapters";
import { Definitions } from "../utils/Definitions";
import { Serializer } from "../utils/Serializer";
import { assertThrow, Utils } from "../utils/Utils";
import { DynamicGlobalProperties } from "./DynamicGlobalProperties";
import { BaseOperation } from "./operation/BaseOperation";

export class Transaction {

    public static create(ops: BaseOperation[], chainId: string, props: DynamicGlobalProperties, transactionExpiration: Duration = DCoreConstants.EXPIRATION_DEFAULT): Transaction {
        const blockId = ByteBuffer.fromHex(props.headBlockId, true);
        const refBlockPrefix = blockId.readUint32(4);
        const refBlockNum = blockId.BE().readUint16(2);
        return new Transaction(ops, props.time.add(transactionExpiration), refBlockNum, refBlockPrefix, chainId, [], []);
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

    // UInt16
    @Expose({ name: "ref_block_num" })
    public refBlockNum: number;

    // UInt32
    @Expose({ name: "ref_block_prefix" })
    public refBlockPrefix: number;

    @Expose({ name: "extensions" })
    public extensions: any[] = [];

    @Exclude()
    public chainId?: string;

    constructor(operations: BaseOperation[], expiration: Moment, refBlockNum: number, refBlockPrefix: number, chainId?: string, extensions: any[] = [], signatures: string[] = []) {
        this.operations = operations;
        this.signatures = signatures;
        this.expiration = expiration;
        this.refBlockNum = refBlockNum;
        this.refBlockPrefix = refBlockPrefix;
        this.extensions = extensions;
        this.chainId = chainId;
    }

    /**
     * Transaction id can be used to retrieve the trx from DCore.
     */
    public get id(): string {
        return Utils.hash256(new Serializer().serialize(this)).slice(0, Definitions.TRX_ID_SIZE).toString("hex");
    }

    /**
     * Generate signature on transaction data. May return undefined if the signature is not valid for DCore.
     *
     * @param key private key
     * @param chainId id of the DCore chain, different for live/testnet/custom net...
     */
    public signature(key: ECKeyPair, chainId: string = this.chainId ? this.chainId : ""): string | undefined {
        assertThrow(!_.isNil(chainId) && chainId.length > 0, () => "chain id must be set on signing");

        const serializer = new Serializer();
        const chainBytes = Buffer.from(chainId, "hex");

        const data = serializer.serialize(this);
        return key.sign(Buffer.concat([chainBytes, data]));
    }

    /**
     * Set a single signature to transaction and return it. May change expiration time to meet valid signature checks for DCore.
     *
     * @param key private key
     * @param chainId id of the DCore chain, different for live/testnet/custom net...
     */
    public withSignature(key: ECKeyPair, chainId: string = this.chainId ? this.chainId : ""): Transaction {
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
