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

    // create DCT
    /*
        constructor(id: ChainObject) {
            this.maxSupply = 7319777577456900;
            this.exchangeRate = new ExchangeRate(id);
            this.exchangeable = false;
            this.extensions = [];
        }
    */
}
