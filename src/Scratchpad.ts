import * as ByteBuffer from "bytebuffer";

/* tslint:disable */
import { deserialize, plainToClass, serialize } from "class-transformer";
import "reflect-metadata";
import * as Long from "long";
import { create } from "rxjs-spy";
import { detectBufferEncoding } from "tslint/lib/utils";
import { Account } from "./models/Account";
import { Authority } from "./models/Authority";
import { ChainObject } from "./models/ChainObject";
import { PubKey } from "./models/PubKey";
import { ApiGroup } from "./net/models/ApiGroup";
import { GetAccountById } from "./net/models/request/GetAccountById";
import { GetAccountByName } from "./net/models/request/GetAccountByName";
import { RpcEndpoints } from "./net/rpc/RpcEndpoints";
import { Serializer } from "./net/serialization/Serializer";
import { RxWebSocket } from "./net/ws/RxWebSocket";
import { BaseUtils } from "./utils/BaseUtils";
import WebSocket = require("isomorphic-ws");

function some() {
    const k = new PubKey();
    k.key = 13456;
    console.log(serialize(k));
    console.log(k);
    const kk = deserialize(PubKey, "{ \"s\": \"13213546.\" }");
    console.log(kk);

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
}

function accountByName() {
    const api = new RpcEndpoints();
    api.request(new GetAccountByName("u961279ec8b7ae7bd62f304f7c1c3d345")).subscribe(
        (account) => console.log(account),
        (err) => console.error(err)
    );
}

function accountById() {
    const api = new RpcEndpoints();
    return api.request(new GetAccountById(ChainObject.parse("1.2.15"))).subscribe(
        (account) => console.log(account),
        (err) => console.error(err)
    );
}

function serialize_account() {
    const json = {
        "id": "1.2.34",
        "registrar": "1.2.15",
        "name": "u961279ec8b7ae7bd62f304f7c1c3d345",
        "owner": {
            "weight_threshold": 1,
            "account_auths": [],
            "key_auths": [["DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz", 1]]
        },
        "active": {
            "weight_threshold": 1,
            "account_auths": [],
            "key_auths": [["DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz", 1]]
        },
        "options": {
            "memo_key": "DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz",
            "voting_account": "1.2.3",
            "num_miner": 0,
            "votes": [],
            "extensions": [],
            "allow_subscription": false,
            "price_per_subscribe": { "amount": 0, "asset_id": "1.3.0" },
            "subscription_period": 0
        },
        "rights_to_publish": {
            "is_publishing_manager": false,
            "publishing_rights_received": [],
            "publishing_rights_forwarded": []
        },
        "statistics": "2.5.34",
        "top_n_control_flags": 0
    };
    const acc = plainToClass(Account, json);
    console.log(acc.owner.keyAuths);
}

function websocket() {
    const rxWs = new RxWebSocket('wss://stagesocket.decentgo.com:8090', (url, protocols) => new WebSocket(url, protocols, { rejectUnauthorized: false }));
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

function serialize() {
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

function base16() {
    const hello = "hello world";
    const bytes = new Buffer(hello);
    console.log(bytes.toString("hex"))
    console.log(BaseUtils["16"].encode(bytes))
}

function maxNumber() {
    const buffer = new ByteBuffer();
    console.log(Number.MAX_SAFE_INTEGER);
    console.log(Number.MAX_SAFE_INTEGER + 1);
    console.log(Number.MAX_VALUE.valueOf());
    console.log(buffer.writeInt64(Number.MAX_SAFE_INTEGER -1))
    console.log(buffer.reset().writeInt64(Number.MAX_VALUE))
    console.log(buffer.reset().writeInt64(Number.MAX_SAFE_INTEGER + 1))
    // console.log(buffer.reset().writeInt64(Number.MAX_SAFE_INTEGER + 1))

}

// some();
// serialize_account()
// accountById()
// accountByName()
// spy.log("RxWebSocket_events")
// websocket();
// serialize()
// base16()
maxNumber()
