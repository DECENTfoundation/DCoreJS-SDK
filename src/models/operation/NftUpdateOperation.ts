import { Expose, Type } from "class-transformer";
import { Fee } from "../../DCoreClient";
import { DCoreConstants } from "../../DCoreConstants";
import { ChainObjectToClass, ChainObjectToPlain } from "../../net/adapter/TypeAdapters";
import { assertThrow } from "../../utils/Utils";
import { ChainObject } from "../ChainObject";
import { NftOptions } from "../NftOptions";
import { ObjectType } from "../ObjectType";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class NftUpdateOperation extends BaseOperation {

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "current_issuer" })
    public readonly issuer: ChainObject;

    @ChainObjectToClass
    @ChainObjectToPlain
    @Expose({ name: "nft_id" })
    public readonly id: ChainObject;

    @Type(() => NftOptions)
    @Expose({ name: "options" })
    public options: NftOptions;

    constructor(issuer: ChainObject, id: ChainObject, options: NftOptions, fee?: Fee) {
        super(OperationType.NftUpdateDefinition, fee);
        this.issuer = issuer;
        this.id = id;
        this.options = options;

        assertThrow(issuer.objectType === ObjectType.Account, () => "not a valid account object id");
        assertThrow(id.objectType === ObjectType.Nft, () => "not a valid nft object id");
        assertThrow(this.options.description.length <= DCoreConstants.UIA_DESCRIPTION_MAX_CHARS,
            () => `description cannot be longer then ${DCoreConstants.UIA_DESCRIPTION_MAX_CHARS} chars`);
        assertThrow(options.maxSupply <= 0xFFFFFFFF);

    }
}
