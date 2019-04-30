import * as chai from "chai";
import { deserialize, plainToClass, serialize } from "class-transformer";
import * as Long from "long";
import "mocha";
import * as moment from "moment";
import "reflect-metadata";
import { Address } from "../../../src/crypto/Address";
import { ECKeyPair } from "../../../src/crypto/ECKeyPair";
import { DCoreConstants } from "../../../src/DCoreConstants";
import { AssetAmount } from "../../../src/models/AssetAmount";
import { AssetOptions } from "../../../src/models/AssetOptions";
import { ChainObject } from "../../../src/models/ChainObject";
import { DynamicGlobalProperties } from "../../../src/models/DynamicGlobalProperties";
import { ExchangeRate } from "../../../src/models/ExchangeRate";
import { Memo } from "../../../src/models/Memo";
import { MessagePayload } from "../../../src/models/MessagePayload";
import { MessagePayloadReceiver } from "../../../src/models/MessagePayloadReceiver";
import { MonitoredAssetOpts } from "../../../src/models/MonitoredAssetOpts";
import { AccountCreateOperation } from "../../../src/models/operation/AccountCreateOperation";
import { AccountUpdateOperation } from "../../../src/models/operation/AccountUpdateOperation";
import { AddOrUpdateContentOperation } from "../../../src/models/operation/AddOrUpdateContentOperation";
import { AssetClaimFeesOperation } from "../../../src/models/operation/AssetClaimFeesOperation";
import { AssetCreateOperation } from "../../../src/models/operation/AssetCreateOperation";
import { AssetFundPoolsOperation } from "../../../src/models/operation/AssetFundPoolsOperation";
import { AssetIssueOperation } from "../../../src/models/operation/AssetIssueOperation";
import { AssetReserveOperation } from "../../../src/models/operation/AssetReserveOperation";
import { LeaveRatingAndCommentOperation } from "../../../src/models/operation/LeaveRatingAndCommentOperation";
import { PurchaseContentOperation } from "../../../src/models/operation/PurchaseContentOperation";
import { RemoveContentOperation } from "../../../src/models/operation/RemoveContentOperation";
import { SendMessageOperation } from "../../../src/models/operation/SendMessageOperation";
import { TransferOperation } from "../../../src/models/operation/TransferOperation";
import { Options } from "../../../src/models/Options";
import { PubKey } from "../../../src/models/PubKey";
import { RegionalPrice } from "../../../src/models/RegionalPrice";
import { Regions } from "../../../src/models/Regions";
import { Synopsis } from "../../../src/models/Synopsis";
import { Transaction } from "../../../src/models/Transaction";
import { Serializer } from "../../../src/net/serialization/Serializer";
import { Helpers } from "../../Helpers";

chai.should();

describe("serialization test suite", () => {
    const serializer = new Serializer();

    it("should serialize transfer operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "278813000000000000001e1f000000000002018096980000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000068656c6c6f206d656d6f00";

        const op = new TransferOperation(
            ChainObject.parse("1.2.30"),
            ChainObject.parse("1.2.31"),
            new AssetAmount(10000000),
            Memo.createPublic("hello memo"),
            new AssetAmount(5000),
        );

        serializer.serialize(op).toString("hex").should.be.equal(expected);
    });

    it("should serialize buy content operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "1500000000000000000033697066733a516d61625537574e485a77636f6a674a724352774b68734a7666696e4c54397866666e4b4d4673726343474746501e809698000000000000010000009b01393130383430393539353932363431303631383538343930393638383830363132333831353335303037303838393138373132303036303039303236323639383330353937313939383532363530313030393830343535343035383735383238393637363235373630393334303934393631353931343538333133383834313435363939373639383133333939313030343939313437333637302e";

        const op = new PurchaseContentOperation(
            "ipfs:QmabU7WNHZwcojgJrCRwKhsJvfinLT9xffnKMFsrcCGGFP",
            ChainObject.parse("1.2.30"),
            new AssetAmount(10000000),
            // tslint:disable-next-line:max-line-length
            new PubKey("9108409595926410618584909688806123815350070889187120060090262698305971998526501009804554058758289676257609340949615914583138841456997698133991004991473670"),
            Regions.None,
            new AssetAmount(0),
        );

        serializer.serialize(op).toString("hex").should.be.equal(expected);
    });

    it("should serialize buy content operation with encoded uri", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "150000000000000000006c687474703a2f2f616c61782e696f2f3f736368656d653d616c6c6178253341253246253246636f6d2e6578616d706c652e68656c6c6f776f726c64253341332676657273696f6e3d37663438623234652d386162392d343831302d386239612d3933363134366164366164321e00e1f5050000000000010000009b01353138323534353438383331383039353030303439383138303536383533393732383231343534353437323437303937343935383333383934323432363735393531303132313835313730383533303632353932313433363737373535353531373238383133393738373936353235333534373538383334303830333534323736323236383732313635363133383837363030323032383433372e";

        const op = new PurchaseContentOperation(
            "http://alax.io/?scheme=allax%3A%2F%2Fcom.example.helloworld%3A3&version=7f48b24e-8ab9-4810-8b9a-936146ad6ad2",
            ChainObject.parse("1.2.30"),
            new AssetAmount(100000000),
            // tslint:disable-next-line:max-line-length
            new PubKey("5182545488318095000498180568539728214545472470974958338942426759510121851708530625921436777555517288139787965253547588340803542762268721656138876002028437"),
            Regions.None,
            new AssetAmount(0),
        );

        serializer.serialize(op).toString("hex").should.be.equal(expected);
    });

    it("should serialize update account operation for vote", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "0220a1070000000000002200000102c03f8e840c1699fd7808c2bb858e249c688c5be8acf0a0c1c484ab0cfb27f0a803000002000500000008000000000000000000000000000000000000";
        const raw = {
            allow_subscription: false,
            // @ts-ignore
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
            undefined,
            undefined,
            options,
            new AssetAmount(500000),
        );

        serializer.serialize(op).toString("hex").should.be.equal(expected);
    });

    it("should serialize create account operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "0100000000000000000022076d696b6565656501000000000102a01c045821676cfc191832ad22cc5c9ade0ea1760131c87ff2dd3fed2f13dd33010001000000000102a01c045821676cfc191832ad22cc5c9ade0ea1760131c87ff2dd3fed2f13dd33010002a01c045821676cfc191832ad22cc5c9ade0ea1760131c87ff2dd3fed2f13dd330300000000000000000000000000000000000000";

        const op = AccountCreateOperation.create(
            ChainObject.parse("1.2.34"),
            "mikeeee",
            Address.parse("DCT6718kUCCksnkeYD1YySWkXb1VLpzjkFfHHMirCRPexp5gDPJLU"),
            new AssetAmount(0),
        );

        serializer.serialize(op).toString("hex").should.be.equal(expected);
    });

    it("should serialize add new content or update operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "140000000000000000000100000000000000220016687474703a2f2f68656c6c6f2e696f2f776f726c6432000000000101000000e80300000000000000222222222222222222222222222222222222222200007238ed5c0000000000000000004c7b227469746c65223a2247616d65205469746c65222c226465736372697074696f6e223a224465736372697074696f6e222c22636f6e74656e745f747970655f6964223a22312e352e35227d00";

        const op = AddOrUpdateContentOperation.create(
            ChainObject.parse("1.2.34"),
            [],
            "http://hello.io/world2",
            new RegionalPrice(new AssetAmount(1000), Regions.None),
            moment.utc("2019-05-28T13:32:34"),
            new Synopsis("Game Title", "Description", "1.5.5"),
            new AssetAmount(),
        );
        op.hash = "2222222222222222222222222222222222222222";

        serializer.serialize(op).toString("hex").should.be.equal(expected);
    });

    it("should serialize remove existing content operation", () => {
        // @ts-ignore
        const expected = "200000000000000000002216687474703a2f2f68656c6c6f2e696f2f776f726c6432";

        const op = new RemoveContentOperation(
            ChainObject.parse("1.2.34"),
            "http://hello.io/world2",
            new AssetAmount(),
        );

        serializer.serialize(op).toString("hex").should.be.equal(expected);
    });

    it("should serialize transfer op transaction", () => {
        // tslint:disable-next-line:max-line-length
        const rawProps = '{"id":"2.1.0","head_block_number":1454654,"head_block_id":"0016323e2ef4e417c019adaef6ef45f910a3dd81","time":"2018-07-31T10:16:15","current_miner":"1.4.9","next_maintenance_time":"2018-08-01T00:00","last_budget_time":"2018-07-31T00:00","unspent_fee_budget":25299491,"mined_rewards":224368000000,"miner_budget_from_fees":38973811,"miner_budget_from_rewards":639249000000,"accounts_registered_this_interval":0,"recently_missed_count":6,"current_aslot":6842787,"recent_slots_filled":"255180578269179676182402108458748313515","dynamic_flags":0,"last_irreversible_block_num":1454654}';
        // tslint:disable-next-line:max-line-length
        const rawOp = '{"from":"1.2.34","to":"1.2.35","amount":{"amount":1500000,"asset_id":"1.3.0"},"memo":{"from":"DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz","to":"DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP","message":"4bc2a1ee670302ceddb897c2d351fa0496ff089c934e35e030f8ae4f3f9397a7","nonce":735604672334802432},"fee":{"amount":500000,"asset_id":"1.3.0"}}';
        const props = deserialize(DynamicGlobalProperties, rawProps);
        const op = deserialize(TransferOperation, rawOp);
        op.extensions = [];
        const trx = Transaction.create([op], Helpers.DCT_CHAIN_ID_STAGE, props, DCoreConstants.EXPIRATION_DEFAULT);
        trx.expiration = moment.utc("2018-08-01T10:14:36");

        // tslint:disable-next-line:max-line-length
        serializer.serialize(trx).toString("hex").should.be.equal("3e322ef4e4170c88615b012720a10700000000000022230000000000020160e3160000000000000102c03f8e840c1699fd7808c2bb858e249c688c5be8acf0a0c1c484ab0cfb27f0a802e0ced80260630f641f61f6d6959f32b5c43b1a38be55666b98abfe8bafcc556b002ea2558d64350a204bc2a1ee670302ceddb897c2d351fa0496ff089c934e35e030f8ae4f3f9397a70000");
    });

    it("should serialize send message operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "1222a1070000000000002201220100a0027b2266726f6d223a22312e322e3334222c227265636569766572735f64617461223a5b7b22746f223a22312e322e3335222c2264617461223a2266643731623963626530353038393933353832303435313366316362346634636364303131353830366431346230336631386437383764653136333366366332222c227075625f746f223a224443543662566d696d745953765751747764726b56565147486b5673544a5a564b74426955716634596d4a6e724a506e6b38395150222c226e6f6e6365223a2234373634323231333839333539393236323732227d5d2c227075625f66726f6d223a22444354364d41355451513655624d794d614c506d505845325379683547335a566876355362466564714c507164464368536571547a227d";

        const key = ECKeyPair.parseWif("5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn");
        const to = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");
        const memo = Memo.createEncrypted("hello messaging api", key, to, Long.fromString("4764221389359926272"));
        const pr = new MessagePayloadReceiver(ChainObject.parse("1.2.35"), memo.message, to, memo.nonce);
        const p = new MessagePayload(ChainObject.parse("1.2.34"), [pr], key.publicAddress);
        const op = new SendMessageOperation(serialize(p), ChainObject.parse("1.2.34"));
        op.fee = new AssetAmount(500002);

        serializer.serialize(op).toString("hex").should.be.eq(expected);
    });

    it("should serialize rate and comment operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "1600000000000000000033697066733a516d57426f52425975787a48356138643367737352624d53357363733666714c4b676170426671564e554655745a1b07636f6d6d656e740100000000000000";

        const op = new LeaveRatingAndCommentOperation(
            "ipfs:QmWBoRBYuxzH5a8d3gssRbMS5scs6fqLKgapBfqVNUFUtZ", Helpers.ACCOUNT, 1, "comment", new AssetAmount(0),
        );

        serializer.serialize(op).toString("hex").should.be.eq(expected);
    });

    it("should serialize create asset operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "0320a1070000000000001b0353444b010968656c6c6f20617069fad456864c011a000100000000000000000100000000000000e70701010100000100";

        const ex = new ExchangeRate(new AssetAmount(1), new AssetAmount(1, ChainObject.parse("1.3.999")));
        const op = new AssetCreateOperation(Helpers.ACCOUNT, "SDK", 1, "hello api", new AssetOptions(ex));
        op.fee = new AssetAmount(500000);

        serializer.serialize(op).toString("hex").should.be.eq(expected);
    });

    it("should serialize create monitored asset operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "03a086010000000000001b0453444b4d041368656c6c6f20617069206d6f6e69746f7265640000000000000000000000000000000000000000000000000000010101000100000000000000000000000000000000000000480fb65c80510100010100";

        const opt = new MonitoredAssetOpts();
        opt.currentFeedPublicationTime = moment.utc("2019-04-16T17:22:16");
        const op = new AssetCreateOperation(Helpers.ACCOUNT, "SDKM", 4, "hello api monitored", new AssetOptions(ExchangeRate.empty(), 0), opt);
        op.fee = new AssetAmount(100000);
        serializer.serialize(op).toString("hex").should.be.eq(expected);
    });

    it("should serialize issue asset operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "040a00000000000000001b0a00000000000000241b0000";

        const op = new AssetIssueOperation(Helpers.ACCOUNT, new AssetAmount(10, ChainObject.parse("1.3.36")), Helpers.ACCOUNT, undefined, new AssetAmount(10));
        serializer.serialize(op).toString("hex").should.be.eq(expected);
    });

    it("should serialize reserve asset operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "220a00000000000000001b0a000000000000002400";

        const op = new AssetReserveOperation(Helpers.ACCOUNT, new AssetAmount(10, ChainObject.parse("1.3.36")), new AssetAmount(10));
        serializer.serialize(op).toString("hex").should.be.eq(expected);
    });

    it("should serialize fund asset pool operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "210a00000000000000001b0a00000000000000240a000000000000000000";

        const op = new AssetFundPoolsOperation(Helpers.ACCOUNT, new AssetAmount(10, ChainObject.parse("1.3.36")), new AssetAmount(10), new AssetAmount(10));
        serializer.serialize(op).toString("hex").should.be.eq(expected);
    });

    it("should serialize claim asset pool operation", () => {
        // tslint:disable-next-line:max-line-length
        const expected = "230a00000000000000001b0a00000000000000240a000000000000000000";

        const op = new AssetClaimFeesOperation(Helpers.ACCOUNT, new AssetAmount(10, ChainObject.parse("1.3.36")), new AssetAmount(10), new AssetAmount(10));
        serializer.serialize(op).toString("hex").should.be.eq(expected);
    });

});
