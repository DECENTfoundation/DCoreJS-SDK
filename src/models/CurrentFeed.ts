import { Expose, Type } from "class-transformer";
import { ExchangeRate } from "./ExchangeRate";

export class CurrentFeed {

    @Type(() => ExchangeRate)
    @Expose({ name: "core_exchange_rate" })
    public coreExchangeRate: ExchangeRate;
}
