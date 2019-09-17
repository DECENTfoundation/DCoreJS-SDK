import { Expose, Type } from "class-transformer";
import { Credentials } from "../../crypto/Credentials";
import { ElGamal } from "../../crypto/ElGamal";
import { Fee } from "../../DCoreClient";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { AssetAmount } from "../AssetAmount";
import { ChainObject } from "../ChainObject";
import { Content } from "../Content";
import { PubKey } from "../PubKey";
import { Regions } from "../Regions";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class PurchaseContentOperation extends BaseOperation {
    public static create(credentials: Credentials, content: Content, fee?: Fee): PurchaseContentOperation {
        return new PurchaseContentOperation(
            content.uri,
            credentials.account,
            content.regionalPrice().price,
            content.uri.startsWith("ipfs") ? new PubKey(ElGamal.createPublic(credentials.keyPair).toString()) : new PubKey(),
            content.regionalPrice().region,
            fee,
        );
    }

    @Expose({ name: "URI" })
    public uri: string;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "consumer" })
    public consumer: ChainObject;

    @Type(() => AssetAmount)
    @Expose({ name: "price" })
    public price: AssetAmount;

    @Type(() => PubKey)
    @Expose({ name: "pubKey" })
    public publicElGamal: PubKey;

    // UInt32
    @Expose({ name: "region_code_from" })
    public regionCode: number;

    /**
     * Request to purchase content operation constructor
     *
     * @param uri uri of the content
     * @param consumer chain object id of the buyer's account
     * @param price price of content, can be equal to or higher then specified in content
     * @param publicElGamal public el gamal key
     * @param regionCode region code of the consumer
     * @param fee {@link AssetAmount} fee for the operation or asset id, if left undefined the fee will be computed in DCT asset.
     * When set, the request might fail if the asset is not convertible to DCT or conversion pool is not large enough
     */
    constructor(
        uri: string,
        consumer: ChainObject,
        price: AssetAmount,
        publicElGamal: PubKey,
        regionCode: Regions = Regions.All,
        fee?: Fee,
    ) {
        super(OperationType.RequestToBuy, fee);
        this.uri = uri;
        this.consumer = consumer;
        this.price = price;
        this.publicElGamal = publicElGamal;
        this.regionCode = regionCode;
    }
}
