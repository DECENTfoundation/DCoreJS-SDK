import * as Long from "long";
import { Moment } from "moment";
import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { BlockHeader } from "../models/BlockHeader";
import { SignedBlock } from "../models/SignedBlock";
import { GetBlock } from "../net/models/request/GetBlock";
import { GetBlockHeader } from "../net/models/request/GetBlockHeader";
import { HeadBlockTime } from "../net/models/request/HeadBlockTime";
import { BaseApi } from "./BaseApi";

export class BlockApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Retrieve a full, signed block.
     *
     * @param blockNum height of the block to be returned
     *
     * @return the referenced block, or {@link ObjectNotFoundError} if no matching block was found
     */
    public get(blockNum: Long): Observable<SignedBlock> {
        return this.request(new GetBlock(blockNum));
    }

    /**
     * Retrieve a block header.
     *
     * @param blockNum height of the block whose header should be returned
     *
     * @return header of the referenced block, or {@link ObjectNotFoundError} if no matching block was found
     */
    public getHeader(blockNum: Long): Observable<BlockHeader> {
        return this.request(new GetBlockHeader(blockNum));
    }

    /**
     * Query the last local block.
     *
     * @return the block time
     */
    public getHeadTime(): Observable<Moment> {
        return this.request(new HeadBlockTime());
    }
}
