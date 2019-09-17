/* tslint:disable */
import * as ByteBuffer from "bytebuffer";
import * as chai from "chai";
import { classToPlain, deserialize, plainToClass, serialize } from "class-transformer";
import { createHash } from "crypto";
import Decimal from "decimal.js";
import * as _ from "lodash";
import * as Long from "long";
import { suite, test, timeout } from "mocha-typescript";
import * as moment from "moment";
import "reflect-metadata";
import { of, zip } from "rxjs";
import { create } from "rxjs-spy";
import { ecdhUnsafe, publicKeyTweakMul } from "secp256k1";
import { Address } from "../src/crypto/Address";
import { ECKeyPair } from "../src/crypto/ECKeyPair";
import { ObjectType, RegionalPrice, Synopsis, Transaction } from "../src/models";
import { Account } from "../src/models/Account";
import { AssetAmount } from "../src/models/AssetAmount";
import { Authority } from "../src/models/Authority";
import { ChainObject } from "../src/models/ChainObject";
import { AddOrUpdateContentOperation, CustomOperation } from "../src/models/operation";
import { TransferOperation } from "../src/models/operation/TransferOperation";
import { ApiGroup } from "../src/net/models/ApiGroup";
import { GetAccountById } from "../src/net/models/request/GetAccountById";
import { GetAccountByName } from "../src/net/models/request/GetAccountByName";
import { RpcService } from "../src/net/rpc/RpcService";
import { RxWebSocket } from "../src/net/ws/RxWebSocket";
import { Helpers } from "./Helpers";
import { NftApple } from "./model/NftApple";
import WebSocket = require("isomorphic-ws");
import { DCoreSdk } from "../src/DCoreSdk";

chai.should();

@suite("a class to run arbitrary methods as a test", timeout(20000))
// @ts-ignore
class Scratchpad {

    private apiWs = DCoreSdk.createApiRx(undefined, () => new WebSocket(Helpers.STAGE_WS), Helpers.LOGGER);

    private apiRpc = DCoreSdk.createApiRx({ baseUrl: Helpers.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false }, undefined, Helpers.LOGGER);

    private api = DCoreSdk.createApiRx(undefined, () => new WebSocket(Helpers.STAGE_WS), Helpers.LOGGER);
    private spy = create();

    @test "get account balance"() {

        this.apiRpc.balanceApi.getAllWithAsset("public-account-1", ["DCT"]).subscribe(
            (b) => console.log(b),
            (err) => console.error(err)
        );
    }

    @test.skip "get account balance by name"() {

        this.apiRpc.balanceApi.getAllWithAsset("u961279ec8b7ae7bd62f304f7c1c3d345", ["DCT"]).subscribe(
            (b) => console.log(b),
            (err) => console.error(err)
        );
    }

    @test "get content by uri"() {

        this.apiRpc.contentApi.get("https://alax.io/1/1/tv.tamago.tamago").subscribe(
            (b) => console.log(b),
            (err) => console.error(err)
        );
    }

    @test "parsing account"() {
        const account = plainToClass(Account,
            {
                "id": "1.2.34",
                "registrar": "1.2.15",
                "name": "u961279ec8b7ae7bd62f304f7c1c3d345",
                "owner": {
                    "weight_threshold": 1,
                    "account_auths": [],
                    "key_auths": [
                        [
                            "DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz",
                            1
                        ]
                    ]
                },
                "active": {
                    "weight_threshold": 1,
                    "account_auths": [],
                    "key_auths": [
                        [
                            "DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz",
                            1
                        ]
                    ]
                },
                "options": {
                    "memo_key": "DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz",
                    "voting_account": "1.2.3",
                    "num_miner": 0,
                    "votes": [
                        "0:5",
                        "0:8"
                    ],
                    "extensions": [],
                    "allow_subscription": false,
                    "price_per_subscribe": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "subscription_period": 0
                },
                "rights_to_publish": {
                    "is_publishing_manager": false,
                    "publishing_rights_received": [],
                    "publishing_rights_forwarded": []
                },
                "statistics": "2.5.34",
                "top_n_control_flags": 0
            });

        const aa = plainToClass(Authority, {
                "weight_threshold": 1,
                "account_auths": [],
                "key_auths": [
                    [
                        "DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz",
                        1
                    ]
                ]
            }
        );
        account.should.be.instanceOf(Account);
        aa.should.be.instanceOf(Authority);
    }

    @test accountByName() {
        const api = new RpcService({ baseUrl: "https://stagesocket.decentgo.com:8090/rpc", timeout: 15000, rejectUnauthorized: false }, Helpers.LOGGER);
        api.request(new GetAccountByName("u961279ec8b7ae7bd62f304f7c1c3d345")).subscribe(
            (account) => console.log(account),
            (err) => console.error(err)
        );
    }

    @test accountById() {
        const api = new RpcService({ baseUrl: "https://stagesocket.decentgo.com:8090/rpc", timeout: 15000, rejectUnauthorized: false }, Helpers.LOGGER);
        return api.request(new GetAccountById([ChainObject.parse("1.2.15")])).subscribe(
            (account) => console.log(account),
            (err) => console.error(err)
        );
    }

    @test serialize_account() {
        const json = {
            "id": "1.2.34",
            "registrar": "1.2.15",
            "name": "u961279ec8b7ae7bd62f304f7c1c3d345",
            "owner": {
                "weight_threshold": 1,
                // @ts-ignore
                "account_auths": [],
                "key_auths": [["DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz", 1]]
            },
            "active": {
                "weight_threshold": 1,
                // @ts-ignore
                "account_auths": [],
                "key_auths": [["DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz", 1]]
            },
            "options": {
                "memo_key": "DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz",
                "voting_account": "1.2.3",
                "num_miner": 0,
                // @ts-ignore
                "votes": [],
                // @ts-ignore
                "extensions": [],
                "allow_subscription": false,
                "price_per_subscribe": { "amount": 0, "asset_id": "1.3.0" },
                "subscription_period": 0
            },
            "rights_to_publish": {
                "is_publishing_manager": false,
                // @ts-ignore
                "publishing_rights_received": [],
                // @ts-ignore
                "publishing_rights_forwarded": []
            },
            "statistics": "2.5.34",
            "top_n_control_flags": 0
        };
        const acc = plainToClass(Account, json);
        console.log(acc.owner.keyAuths);
    }

    @test websocket() {
        const rxWs = new RxWebSocket(() => new WebSocket("wss://stagesocket.decentgo.com:8090", { rejectUnauthorized: false }), Helpers.LOGGER);
        const spy = create();
        spy.log(/^RxWebSocket_make_\w+/);

        rxWs.request(new GetAccountByName("u961279ec8b7ae7bd62f304f7c1c3d345"))
        // .pipe(mergeMap(() => rxWs.request(new GetAccountById(ChainObject.parse("1.2.15")))))
            .subscribe();

        /*
            rxWs.request(new GetAccountById(ChainObject.parse("1.2.15")))
                .subscribe();

            rxWs.request(new GetAccountBalances(ChainObject.parse("1.2.35"), []))
                .subscribe();
        */

        // rxWs.request(new GetChainId())
        //     .subscribe()
    }

    @test serialization() {
        const id = ChainObject.parse("1.2.31");
        // const serializer = new Serializer();
        const buffer = new ByteBuffer(8, ByteBuffer.LITTLE_ENDIAN);
        // console.log(serializer.serialize(id.fullInstance));
        // console.log(id.fullInstance.toNumber());
        // console.log(buffer.writeUint64(1).mark(buffer.offset).writeUint64(31).reset().skip(6).writeByte(2).writeByte(1));
        console.log(buffer.writeByte(2, 7).writeByte(1, 6).writeUint64(id.instance)); //.writeByte(2).writeByte(1));
        // console.log(Long.fromNumber(1).shiftLeft(56).or(Long.fromNumber(2).shiftLeft(48)).or(31));
        // console.log(Long.fromNumber(1).shiftLeft(56).or(Long.fromNumber(2).shiftLeft(48)).or(31).toString());
    }

    @test base16() {
        const hello = "hello world";
        const bytes = Buffer.from(hello);
        console.log(bytes.toString("hex"));
    }

    @test maxNumber() {
        const buffer = new ByteBuffer();
        console.log(Number.MAX_SAFE_INTEGER);
        console.log(Number.MAX_SAFE_INTEGER + 10);
        console.log(Number.MAX_VALUE.valueOf());
        console.log(buffer.writeInt64(Number.MAX_SAFE_INTEGER - 1));
        console.log(buffer.reset().writeInt64(Number.MAX_VALUE));
        console.log(buffer.reset().writeInt64(Number.MAX_SAFE_INTEGER + 1));
        console.log(buffer.reset().writeInt64(Number.MAX_SAFE_INTEGER + 10));
        // console.log(buffer.reset().writeInt64(Number.MAX_SAFE_INTEGER + 1))

    }

    @test wif() {
        const pkey = "5JVHeRffGsKGyDf7T9i9dBbzVHQrYprYeaBQo2VCSytj7BxpMCq";
        const kp = ECKeyPair.parseWif(pkey);
        console.log(kp.privateKey.toString());
        console.log(new Address(kp.publicKey).encoded);
    }

    @test dcoreSdk() {
        // spy.log(/^API_\w+/);
        this.spy.log();
        this.apiWs.assetApi.getAll([ChainObject.parse("1.3.1000")]).subscribe();
        this.apiRpc.assetApi.getAll([ChainObject.parse("1.3.1000")]).subscribe();
    }

    @test instanceChecks() {
        const bb = ByteBuffer.allocate(10);
        let l = Long.fromValue(1);
        console.log(l);
        console.log(l instanceof Long);
        // l = Long.fromValue(10);
        // console.log(l instanceof Long)
        // @ts-ignore
        bb.writeUint64(l.toString());
    }

    @test "make a transfer broadcast through API"() {
        const op = new TransferOperation(
            ChainObject.parse("1.2.34"),
            ChainObject.parse("1.2.35"),
            new AssetAmount(1),
        );

        this.spy.log();
        this.api.broadcastApi.broadcastWithCallback(Helpers.KEY, [op]).subscribe();
    }

    @test "construct with default values"() {
        class Foo {
            public def: number = 10;
            public cons: number;

            constructor(value: number) {
                this.cons = value;
            }
        }

        const foo = new Foo(5);
        foo.cons.should.be.equal(5);
        foo.def.should.be.equal(10);
    }

    @test "test nonce"() {
        const entropy = createHash("sha224").update(ECKeyPair.generate().privateKey).digest();
        const time = Buffer.of(...Long.fromValue(moment().valueOf()).toBytesLE());
        const bytes = Buffer.concat([time.slice(0, 7), entropy.slice(0, 1),]);
        console.log(bytes);

        // const num = Long.fromBytes([...bytes], true);
        const rev = Long.fromString(bytes.toString("hex"), true, 16);
        // console.log(num.toString())
        console.log(rev.toString());
        console.log(Buffer.of(...rev.toBytesLE()));
    }

    @test "shared secret"() {
        const keyPair = ECKeyPair.parseWif("5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn");
        const address = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");
        console.log(ecdhUnsafe(address.publicKey, keyPair.privateKey, true).toString("hex"));

        console.log(publicKeyTweakMul(address.publicKey, keyPair.privateKey));

    }

    @test.skip "content encoding check"() {
        const now = new Date();
        const diacriticsOperation = AddOrUpdateContentOperation.create(
            ChainObject.parse("1.2.34"),
            [],
            "https://staging-resources.alax.io/apps/mobi.minicraft.three.mini.craft.building.games14",
            [new RegionalPrice(new AssetAmount(0))],
            moment(now).add(7, "days"),
            new Synopsis("nbnbj", "ádááá", "1.5.5"),
        );
        this.api.broadcastApi.broadcastWithCallback(Helpers.KEY, [diacriticsOperation]).subscribe();
    }

    @test "type adapters"() {
        const json = { "amount": 18446744073709550000, "asset_id": "1.3.0" };
        const clazz = plainToClass(AssetAmount, json);
        const plain = classToPlain(clazz);
        console.log(clazz);
        // console.log(clazz.amount.toString());
        console.log(plain);
        console.log(json);
        // console.log(Long.fromValue("1152921504606847000").toString());

        const big = Long.MAX_UNSIGNED_VALUE.toString();
        console.log(big);
        console.log(big.toString());
        console.log(Long.fromString(big.toString(), true).toString());

        JSON.stringify(json).should.be.equal(JSON.stringify(plain));
    }

    @test "enum to string"() {
        console.log(ApiGroup.Broadcast.toString().toLowerCase());
    }

    @test "long unsigned"() {
        console.log(Long.fromString("1234567890"));
        console.log(Long.fromString("1234567890", false).toUnsigned());
        console.log(Long.fromString("1234567890", true).toUnsigned());
        console.log(Long.fromString("1234567890", false).toSigned());
        console.log(Long.fromString("-1234567890"));
        console.log(Long.fromString("-1234567890", true));
        console.log(Long.MAX_VALUE);
        console.log(Long.MAX_VALUE.toUnsigned());
        console.log(Long.MAX_UNSIGNED_VALUE);
        console.log(Long.MAX_UNSIGNED_VALUE.toSigned());
    }

    @test "buffer"() {
        const bb = ByteBuffer.fromUTF8("asd");
        Buffer.isBuffer(bb.toBuffer()).should.be.true;
        console.log(_.isEmpty(undefined));
    }

    @test "undef"() {
        console.log(undefined && "hello undefined");
        console.log("defined" && "hello defined");
    }

    @test "zip"() {
        zip(zip(...[of("hello"), of(" "), of("world")]), of("foo"))
            .subscribe((value) => console.log(value));
    }

    @test "decimals"() {
        const max = Number.MAX_SAFE_INTEGER;
        const d = new Decimal(`${max}.${max}`);
        const d1 = new Decimal(1);
        const d5 = new Decimal(0.05);
        console.log(d.toString());
        console.log(d.toPrecision(8));
        console.log(d.toDecimalPlaces(4));
        console.log(d.toFixed(5));
        console.log(d1.toDecimalPlaces(4));
        console.log(d1.toFixed(5));
        console.log(d5.toDecimalPlaces(1));
    }

    @test "ref block"() {
        const id = "003482ff012880f806baa6f220538425804136be";
        const num = 3441407;
        const refId = 4169148417;
        const refNum = 33535;

        const b = ByteBuffer.fromHex(id, true);

        b.readUint32(4).should.equal(refId);
        b.BE().readUint32(0).should.equal(num);
        b.BE().readUint16(2).should.equal(refNum);

    }

    @test "serialize tx"() {
        const pkey = "5JVHeRffGsKGyDf7T9i9dBbzVHQrYprYeaBQo2VCSytj7BxpMCq";
        const kp = ECKeyPair.parseWif(pkey);
        this.apiRpc.transactionApi.createTransaction([new TransferOperation(
            ChainObject.parse("1.2.33"),
            ChainObject.parse("1.2.33"),
            new AssetAmount(1))]).toPromise().then(tran => {
            const st = tran.withSignature(kp);
            console.log(st);
            console.log(serialize(st));
            console.log(deserialize(Transaction, serialize(st)));
        });
    }

    @test "parse chain object"() {
        ChainObject.parse("1.9.20").objectType.should.equal(ObjectType.VestingBalance);
        ChainObject.parse("2.18.20").objectType.should.equal(ObjectType.MessagingObject);
    }

    @test "constructors"() {
        const vals: any[] = [1, "red", false];
        const apple = Reflect.construct(NftApple, vals) as NftApple;
        console.log(apple);
        console.log(_.values(apple));
        console.log(NftApple.DEFINITION);
        console.log(apple.definition);
    }

    @test "address is valid"() {
        Address.isValid("hello").should.be.false;
    }

    @test.only() "broadcast custom operation"() {
        const customOperation = new CustomOperation(
            978,
            Helpers.ACCOUNT,
            [],
            Buffer.from("Any data you need here").toString("hex")
        );
        this.api.broadcastApi.broadcastWithCallback(Helpers.KEY, [customOperation]).subscribe();
    }
}
