import { Expose, Type } from "class-transformer";
import * as _ from "lodash";
import { Fee } from "../../DCoreClient";
import { DCoreConstants } from "../../DCoreConstants";
import { assertThrow } from "../../utils/Utils";
import { Asset } from "../Asset";
import { NftDataType } from "../NftDataType";
import { NftModifiableBy } from "../NftModifiableBy";
import { NftOptions } from "../NftOptions";
import { BaseOperation } from "./BaseOperation";
import { OperationType } from "./OperationType";

export class NftCreateOperation extends BaseOperation {

    @Expose({ name: "symbol" })
    public readonly symbol: string;

    @Expose({ name: "options" })
    @Type(() => NftOptions)
    public readonly options: NftOptions;

    @Type(() => NftDataType)
    @Expose({ name: "definitions" })
    public readonly definitions: NftDataType[];

    @Expose({ name: "transferable" })
    public readonly transferable: boolean;

    constructor(
        symbol: string,
        options: NftOptions,
        definitions: NftDataType[],
        transferable: boolean,
        fee?: Fee,
    ) {
        super(OperationType.NftCreateDefinition, fee);
        this.symbol = symbol;
        this.options = options;
        this.definitions = definitions;
        this.transferable = transferable;

        // plainToClass ctor passes undefined args so just skip
        assertThrow(Asset.isValidSymbol(this.symbol), () => `invalid nft symbol ${this.symbol}`);
        assertThrow(this.options.description.length <= DCoreConstants.UIA_DESCRIPTION_MAX_CHARS,
            () => `description cannot be longer then ${DCoreConstants.UIA_DESCRIPTION_MAX_CHARS} chars`);
        assertThrow(this.definitions.every((it) => it.modifiable === NftModifiableBy.Nobody || !_.isNil(it.name)),
            () => "modifiable data type must have name");
        assertThrow(definitions.every((it) => _.isNil(it.name) || it.name.length <= DCoreConstants.NFT_NAME_MAX_CHARS),
            () => `name cannot be longer then ${DCoreConstants.NFT_NAME_MAX_CHARS} chars`);
        assertThrow(options.maxSupply <= 0xFFFFFFFF);
    }

}
