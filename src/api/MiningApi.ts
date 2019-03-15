import * as Long from "long";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { DCoreApi } from "../DCoreApi";
import { AccountRef } from "../DCoreSdk";
import { ChainObject } from "../models/ChainObject";
import { Miner } from "../models/Miner";
import { MinerId } from "../models/MinerId";
import { MinerVotes } from "../models/MinerVotes";
import { MinerVotingInfo } from "../models/MinerVotingInfo";
import { AccountUpdateOperation } from "../models/operation/AccountUpdateOperation";
import { SearchMinerVotingOrder } from "../models/order/SearchMinerVotingOrder";
import { VoteId } from "../models/VoteId";
import { GetActualVotes } from "../net/models/request/GetActualVotes";
import { GetAssetPerBlock } from "../net/models/request/GetAssetPerBlock";
import { GetFeedsByMiner } from "../net/models/request/GetFeedsByMiner";
import { GetMinerByAccount } from "../net/models/request/GetMinerByAccount";
import { GetMinerCount } from "../net/models/request/GetMinerCount";
import { GetMiners } from "../net/models/request/GetMiners";
import { GetNewAssetPerBlock } from "../net/models/request/GetNewAssetPerBlock";
import { LookupMinerAccounts } from "../net/models/request/LookupMinerAccounts";
import { LookupVoteIds } from "../net/models/request/LookupVoteIds";
import { SearchMinerVoting } from "../net/models/request/SearchMinerVoting";
import { BaseApi } from "./BaseApi";

export class MiningApi extends BaseApi {

    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get the number of votes each miner actually has.
     *
     * @return a list mapping account names to the number of votes
     */
    public getActualVotes(): Observable<MinerVotes[]> {
        return this.request(new GetActualVotes());
    }

    /**
     * Returns a reward for a miner from a specified block.
     *
     * @param blockNum block number
     *
     * @return amount of generated DCT
     */
    public getAssetPerBlock(blockNum: Long): Observable<Long> {
        return this.request(new GetAssetPerBlock(blockNum));
    }

    /**
     * Get a list of published price feeds by a miner.
     *
     * @param account account object id, 1.2.*
     * @param count maximum number of price feeds to fetch (must not exceed 100)
     *
     * @return a list of price feeds published by the miner
     *
     */
    // todo model
    public getFeedsByMiner(account: ChainObject, count: number = 100) {
        return this.request(new GetFeedsByMiner(account, count));
    }

    /**
     * Get the miner owned by a given account.
     *
     * @param account the account object id, 1.2.*, whose miner should be retrieved
     *
     * @return the miner object, or [ObjectNotFoundException] if the account does not have a miner
     */
    public getMinerByAccount(account: ChainObject): Observable<Miner> {
        return this.request(new GetMinerByAccount(account));
    }

    /**
     * Get the total number of miners registered in DCore.
     *
     * @return number of miners
     */
    public getMinerCount(): Observable<Long> {
        return this.request(new GetMinerCount());
    }

    /**
     * Returns list of miners by their Ids
     *
     * @param minerIds miner ids
     *
     * @return a list of miners
     */
    public getMiners(minerIds: ChainObject[]): Observable<Miner[]> {
        return this.request(new GetMiners(minerIds));
    }

    /**
     * Returns map of the first 1000 miners by their name to miner account
     *
     * @return a map of miner name to miner account
     */
    public getMinersToName(): Observable<Map<string, Miner>> {
        return this.listMinersRelative().pipe(
            flatMap((ids) => this.getMiners(ids.map((id) => id.id)).pipe(
                map((miners) => new Map(ids.map((id, idx) => [id.name, miners[idx]] as [string, Miner]))),
            )),
        );
    }

    /**
     * Returns a reward for a miner from the most recent block.
     *
     * @return amount of newly generated DCT
     */
    public getNewAssetPerBlock(): Observable<Long> {
        return this.request(new GetNewAssetPerBlock());
    }

    /**
     * lookup names and IDs for registered miners
     *
     * @param lowerBound lower bound of the first name
     * @param limit max 1000
     *
     * @return list of found miner ids
     */
    public listMinersRelative(lowerBound: string = "", limit: number = 1000): Observable<MinerId[]> {
        return this.request(new LookupMinerAccounts(lowerBound, limit));
    }

    /**
     * Given a set of votes, return the objects they are voting for.
     * The results will be in the same order as the votes. null will be returned for any vote ids that are not found.
     *
     * @param voteIds set of votes
     *
     * @return a list of miners
     */
    public findVotedMiners(voteIds: VoteId[]): Observable<Miner[]> {
        return this.request(new LookupVoteIds(voteIds));
    }

    /**
     * Get miner voting info list by account that match search term.
     *
     * @param searchTerm miner name
     * @param order available options are defined in [SearchMinerVotingOrder]
     * @param id the object id of the miner to start searching from, 1.4.* or null when start from beginning
     * @param accountName account name or null when searching without account
     * @param onlyMyVotes when true it selects only votes given by account
     * @param limit maximum number of miners info to fetch (must not exceed 1000)
     *
     * @return a list of miner voting info
     */
    public findAllVotingInfo(
        searchTerm: string,
        order: SearchMinerVotingOrder = SearchMinerVotingOrder.NameDesc,
        id?: ChainObject,
        accountName?: string,
        onlyMyVotes: boolean = false,
        limit: number = 1000,
    ): Observable<MinerVotingInfo[]> {
        return this.request(new SearchMinerVoting(searchTerm, accountName, onlyMyVotes, order, id, limit));
    }

    /**
     * Create vote for miner operation.
     *
     * @param account account name or object id, 1.2.*
     * @param minerIds list of miner account ids
     *
     * @return a transaction confirmation
     */
    public createVoteOperation(
        account: AccountRef,
        minerIds: ChainObject[],
    ): Observable<AccountUpdateOperation> {
        return this.getMiners(minerIds).pipe(
            flatMap((miners) => this.api.accountApi.get(account)
                .pipe(map((acc) => AccountUpdateOperation.create(acc, miners.map((m) => m.voteId)))),
            ),
        );
    }
}
