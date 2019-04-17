import { Expose, Type } from "class-transformer";
import { ExchangeRate } from "./ExchangeRate";

export class PriceFeed {

    @Type(() => ExchangeRate)
    @Expose({ name: "core_exchange_rate" })
    public coreExchangeRate: ExchangeRate;

    constructor(coreExchangeRate: ExchangeRate = ExchangeRate.empty()) {
        this.coreExchangeRate = coreExchangeRate;
    }
}
