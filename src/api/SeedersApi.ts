import { Observable } from "rxjs";
import { DCoreApi } from "../DCoreApi";
import { ChainObject } from "../models/ChainObject";
import { Regions } from "../models/Regions";
import { Seeder } from "../models/Seeder";
import { GetSeeder } from "../net/models/request/GetSeeder";
import { ListSeedersByPrice } from "../net/models/request/ListSeedersByPrice";
import { ListSeedersByRating } from "../net/models/request/ListSeedersByRating";
import { ListSeedersByRegion } from "../net/models/request/ListSeedersByRegion";
import { ListSeedersByUpload } from "../net/models/request/ListSeedersByUpload";
import { BaseApi } from "./BaseApi";

export class SeedersApi extends BaseApi {
    constructor(api: DCoreApi) {
        super(api);
    }

    /**
     * Get a seeder by ID.
     * @param accountId seeder account object id
     *
     * @return a seeder object or {@link ObjectNotFoundError} if not found
     */
    public get(accountId: ChainObject): Observable<Seeder> {
        return this.request(new GetSeeder(accountId));
    }

    /**
     * Get a list of seeders by price, in increasing order.
     *
     * @param count number of items to retrieve, max 100
     *
     * @return a list of seeders
     */
    public listByPrice(count: number = 100): Observable<Seeder[]> {
        return this.request(new ListSeedersByPrice(count));
    }

    /**
     * Get a list of seeders ordered by total upload, in decreasing order.
     *
     * @param count number of items to retrieve, max 100
     *
     * @return a list of seeders
     */
    public listByUpload(count: number = 100): Observable<Seeder[]> {
        return this.request(new ListSeedersByUpload(count));
    }

    /**
     * Get a list of seeders ordered by price.
     *
     * @param region defined in {@link Regions}
     *
     * @return a list of seeders
     */
    public listByRegion(region: Regions = Regions.All): Observable<Seeder[]> {
        return this.request(new ListSeedersByRegion(region));
    }

    /**
     * Get a list of seeders by price, in decreasing order.
     *
     * @param count number of items to retrieve, max 100
     *
     * @return a list of seeders
     */
    public listByRating(count: number = 100): Observable<Seeder[]> {
        return this.request(new ListSeedersByRating(count));
    }

}
