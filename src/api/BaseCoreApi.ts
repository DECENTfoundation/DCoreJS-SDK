import { Duration } from "moment";
import { Observable } from "rxjs";
import { DCoreClient, Newable } from "../DCoreClient";
import { DCoreConstants } from "../DCoreConstants";
import { ChainObject } from "../models/ChainObject";
import { NftDefinition } from "../models/NftModel";
import { BaseRequest } from "../net/models/request/BaseRequest";
import { WithCallback } from "../net/models/request/WithCallback";

export abstract class BaseCoreApi {
    public transactionExpiration: Duration = DCoreConstants.EXPIRATION_DEFAULT;

    public registeredNfts: Map<string, Newable<any>> = new Map<string, Newable<any>>();

    protected constructor(protected core: DCoreClient) {
    }

    public request<T>(request: BaseRequest<T>): Observable<T> {
        return this.core.request(request);
    }

    public requestStream<T>(request: BaseRequest<T> & WithCallback): Observable<T> {
        return this.core.requestStream(request);
    }

    public disconnect() {
        this.core.disconnect();
    }

    public set timeout(millis: number) {
        this.core.timeout = millis;
    }

    /**
     * Register NFT data model with object id, if no model is provided the [RawNft] will be used
     *
     * @param idToClass id to class pairs
     */
    public registerNfts<T extends NftDefinition>(...idToClass: Array<[ChainObject, Newable<T>]>) {
        idToClass.forEach(([id, c]) => this.registeredNfts.set(id.objectId, c));
    }

    /**
     * Remove registered NFT data model
     *
     * @param ids nft ids to remove
     */
    public unregisterNfts(...ids: [ChainObject]) {
        ids.forEach((id) => this.registeredNfts.delete(id.objectId));
    }
}
