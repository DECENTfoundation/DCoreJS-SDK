import * as chai from "chai";
import { plainToClass } from "class-transformer";
import "mocha";
import "reflect-metadata";
import { Address } from "../../../src/crypto/Address";
import { AssetAmount } from "../../../src/models/AssetAmount";
import { ChainObject } from "../../../src/models/ChainObject";
import { Memo } from "../../../src/models/Memo";
import { AccountCreateOperation } from "../../../src/models/operation/AccountCreateOperation";
import { AccountUpdateOperation } from "../../../src/models/operation/AccountUpdateOperation";
import { BuyContentOperation } from "../../../src/models/operation/BuyContentOperation";
import { TransferOperation } from "../../../src/models/operation/TransferOperation";
import { Options } from "../../../src/models/Options";
import { PubKey } from "../../../src/models/PubKey";
import { Serializer } from "../../../src/net/serialization/Serializer";

chai.should();

describe("serialization test suite", () => {
    const serializer: Serializer = new Serializer();

    it("should serialize transfer operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "278813000000000000001e1f000000000002018096980000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000068656c6c6f206d656d6f00";

        const op = new TransferOperation(
            ChainObject.parse("1.2.30"),
            ChainObject.parse("1.2.31"),
            new AssetAmount(10000000),
            new Memo("hello memo"),
            new AssetAmount(5000),
        );

        serializer.serialize(op).toHex().should.be.equal(expected);
    });

    it("should serialize buy content operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "1500000000000000000033697066733a516d61625537574e485a77636f6a674a724352774b68734a7666696e4c54397866666e4b4d4673726343474746501e809698000000000000010000009b01393130383430393539353932363431303631383538343930393638383830363132333831353335303037303838393138373132303036303039303236323639383330353937313939383532363530313030393830343535343035383735383238393637363235373630393334303934393631353931343538333133383834313435363939373639383133333939313030343939313437333637302e";

        const op = new BuyContentOperation(
            "ipfs:QmabU7WNHZwcojgJrCRwKhsJvfinLT9xffnKMFsrcCGGFP",
            ChainObject.parse("1.2.30"),
            new AssetAmount(10000000),
        // tslint:disable-next-line:max-line-length
            new PubKey("9108409595926410618584909688806123815350070889187120060090262698305971998526501009804554058758289676257609340949615914583138841456997698133991004991473670"),
        );

        serializer.serialize(op).toHex().should.be.equal(expected);
    });

    it("should serialize buy content operation with encoded uri", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "150000000000000000006c687474703a2f2f616c61782e696f2f3f736368656d653d616c6c6178253341253246253246636f6d2e6578616d706c652e68656c6c6f776f726c64253341332676657273696f6e3d37663438623234652d386162392d343831302d386239612d3933363134366164366164321e00e1f5050000000000010000009b01353138323534353438383331383039353030303439383138303536383533393732383231343534353437323437303937343935383333383934323432363735393531303132313835313730383533303632353932313433363737373535353531373238383133393738373936353235333534373538383334303830333534323736323236383732313635363133383837363030323032383433372e";

        const op = new BuyContentOperation(
            "http://alax.io/?scheme=allax%3A%2F%2Fcom.example.helloworld%3A3&version=7f48b24e-8ab9-4810-8b9a-936146ad6ad2",
            ChainObject.parse("1.2.30"),
            new AssetAmount(100000000),
        // tslint:disable-next-line:max-line-length
            new PubKey("5182545488318095000498180568539728214545472470974958338942426759510121851708530625921436777555517288139787965253547588340803542762268721656138876002028437"),
        );

        serializer.serialize(op).toHex().should.be.equal(expected);
    });

    it("should serialize update account operation for vote", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "0220a1070000000000002200000102c03f8e840c1699fd7808c2bb858e249c688c5be8acf0a0c1c484ab0cfb27f0a803000002000500000008000000000000000000000000000000000000";
        const raw = {
            allow_subscription: false,
            extensions: [],
            memo_key: "DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz",
            num_miner: 0,
            price_per_subscribe: {
                amount: 0,
                asset_id: "1.3.0",
            },
            subscription_period: 0,
            votes: [
                "0:5",
                "0:8",
            ],
            voting_account: "1.2.3",
        };
        const options = plainToClass(Options, raw);

        const op = new AccountUpdateOperation(
            ChainObject.parse("1.2.34"),
            null,
            null,
            options,
            new AssetAmount(500000),
        );

        serializer.serialize(op).toHex().should.be.equal(expected);
    });

    it("should serialize create account operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "0100000000000000000022086d696b656565656501000000000102a01c045821676cfc191832ad22cc5c9ade0ea1760131c87ff2dd3fed2f13dd33010001000000000102a01c045821676cfc191832ad22cc5c9ade0ea1760131c87ff2dd3fed2f13dd33010002a01c045821676cfc191832ad22cc5c9ade0ea1760131c87ff2dd3fed2f13dd330300000000000000000000000000000000000000";

        const op = new AccountCreateOperation(
            ChainObject.parse("1.2.34"),
            "mikeeeee",
            Address.parse("DCT6718kUCCksnkeYD1YySWkXb1VLpzjkFfHHMirCRPexp5gDPJLU"),
            new AssetAmount(0),
        );

        serializer.serialize(op).toHex().should.be.equal(expected);
    });

});
