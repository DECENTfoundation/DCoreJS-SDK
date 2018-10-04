/* tslint:disable */
import * as ByteBuffer from "bytebuffer";
import * as chai from "chai";
import { plainToClass } from "class-transformer";
import { createHash } from "crypto";
import * as Long from "long";
import { suite, test, timeout } from "mocha-typescript";
import * as moment from "moment";
import "reflect-metadata";
import { create } from "rxjs-spy";
import { ecdhUnsafe, publicKeyTweakMul } from "secp256k1";
import { Address } from "../src/crypto/Address";
import { ECKeyPair } from "../src/crypto/ECKeyPair";
import { DCoreSdk } from "../src/DCoreSdk";
import { Account } from "../src/models/Account";
import { AssetAmount } from "../src/models/AssetAmount";
import { Authority } from "../src/models/Authority";
import { ChainObject } from "../src/models/ChainObject";
import { TransferOperation } from "../src/models/operation/TransferOperation";
import { GetAccountById } from "../src/net/models/request/GetAccountById";
import { GetAccountByName } from "../src/net/models/request/GetAccountByName";
import { RpcService } from "../src/net/rpc/RpcService";
import { RxWebSocket } from "../src/net/ws/RxWebSocket";
import { Utils } from "../src/utils/Utils";
import { Constants } from "./Constants";
import WebSocket = require("isomorphic-ws");

chai.should();

@suite("a class to run arbitrary methods as a test", timeout(20000))
// @ts-ignore
class Scratchpad {

    private apiWs = DCoreSdk.createForWebSocket(
        () => new WebSocket(Constants.STAGE_WS, { rejectUnauthorized: false })
    );

    private apiRpc = DCoreSdk.createForHttp(
        { baseUrl: Constants.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false }
    );

    private api = DCoreSdk.create(
        { baseUrl: Constants.STAGE_HTTPS, timeout: 15000, rejectUnauthorized: false },
        () => new WebSocket(Constants.STAGE_WS, { rejectUnauthorized: false }),
    );
    private spy = create();

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
        const api = new RpcService({ baseUrl: "https://stagesocket.decentgo.com:8090/rpc", timeout: 15000, rejectUnauthorized: false });
        api.request(new GetAccountByName("u961279ec8b7ae7bd62f304f7c1c3d345")).subscribe(
            (account) => console.log(account),
            (err) => console.error(err)
        );
    }

    @test accountById() {
        const api = new RpcService({ baseUrl: "https://stagesocket.decentgo.com:8090/rpc", timeout: 15000, rejectUnauthorized: false });
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
        const rxWs = new RxWebSocket(() => new WebSocket("wss://stagesocket.decentgo.com:8090", { rejectUnauthorized: false }));
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
        const bytes = new Buffer(hello);
        console.log(bytes.toString("hex"));
        console.log(Utils.Base16.encode(bytes));
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
        this.apiWs.assetApi.getAssets([ChainObject.parse("1.3.1000")]).subscribe();
        this.apiRpc.assetApi.getAssets([ChainObject.parse("1.3.1000")]).subscribe();
    }

    @test instanceChecks() {
        const bb = ByteBuffer.allocate(10);
        let l = Long.fromValue(1);
        console.log(l);
        bb.writeUint64(l);
        // console.log(l instanceof Long);
        // l = Long.fromValue(10);
        // console.log(l instanceof Long)
    }

    @test "make a transfer broadcast through API"() {
        const op = new TransferOperation(
            ChainObject.parse("1.2.34"),
            ChainObject.parse("1.2.35"),
            new AssetAmount(1),
        );

        this.spy.log();
        this.api.broadcastApi.broadcastWithCallback(Constants.KEY, [op]).subscribe();
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
        const bytes = Buffer.concat([time.slice(0, 7), entropy.slice(0, 1), ]);
        console.log(bytes)

        const num = Long.fromBytesLE([...bytes], true);
        const rev = Long.fromString(num.toString(), true);
        console.log(num.toString())
        console.log(rev.toString())
        console.log(Buffer.of(...rev.toBytesLE()))
    }

    @test "shared secret"() {
        const keyPair = ECKeyPair.parseWif("5Jd7zdvxXYNdUfnEXt5XokrE3zwJSs734yQ36a1YaqioRTGGLtn");
        const address = Address.parse("DCT6bVmimtYSvWQtwdrkVVQGHkVsTJZVKtBiUqf4YmJnrJPnk89QP");
        console.log(ecdhUnsafe(address.publicKey, keyPair.privateKey, true).toString("hex"));

        console.log(publicKeyTweakMul(address.publicKey, keyPair.privateKey))

    }
}
// 02e4d03d9995ebb1b61b11e5e8631a70cdfdd2691df320ad3187751b256cccf808
// e4d03d9995ebb1b61b11e5e8631a70cdfdd2691df320ad3187751b256cccf808
