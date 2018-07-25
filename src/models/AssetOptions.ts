import { Expose, Type } from "class-transformer";
import { ExchangeRate } from "./ExchangeRate";

export class AssetOptions {

    @Expose({ name: "max_supply" })
    public maxSupply: number;

    @Type(() => ExchangeRate)
    @Expose({ name: "core_exchange_rate" })
    public exchangeRate: ExchangeRate;

    @Expose({ name: "is_exchangeable" })
    public exchangeable: boolean;

    @Expose({ name: "extensions" })
    public extensions: any[];

    constructor(maxSupply: number = 0, exchangeRate: ExchangeRate = new ExchangeRate(), exchangeable: boolean = false, extensions: any[] = []) {
        this.maxSupply = maxSupply;
        this.exchangeRate = exchangeRate;
        this.exchangeable = exchangeable;
        this.extensions = extensions;
    }
}
