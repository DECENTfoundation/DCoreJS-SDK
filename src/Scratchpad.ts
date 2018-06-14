/* tslint:disable */
import { deserialize, plainToClass, serialize } from "class-transformer";
import "reflect-metadata";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Subject } from "rxjs/internal/Subject";
import { tap } from "rxjs/operators";
import { Account } from "./models/Account";
import { Asset } from "./models/Asset";
import { Authority } from "./models/Authority";
import { ChainObject } from "./models/ChainObject";
import { PubKey } from "./models/PubKey";
import { GetAccountById } from "./net/models/request/GetAccountById";
import { GetAccountByName } from "./net/models/request/GetAccountByName";
import { RpcEndpoints } from "./net/rpc/RpcEndpoints";
import { connect, OnMessage, OnOpen, RxWebSocket } from "./net/ws/RxWebSocket";
import WebSocket = require("isomorphic-ws");
import values = require("lodash/fp/values");

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
    )
}

function accountByName() {
    const api = new RpcEndpoints();
    api.makeRequest(new GetAccountByName("u961279ec8b7ae7bd62f304f7c1c3d345")).subscribe(
        (account) => console.log(account),
        (err) => console.error(err)
    )
}

function accountById() {
    const api = new RpcEndpoints();
    return api.makeRequest(new GetAccountById(ChainObject.parse("1.2.15"))).subscribe(
        (account) => console.log(account),
        (err) => console.error(err)
    )
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
    }
    const acc = plainToClass(Account, json);
    console.log(acc.owner.keyAuths)
}

function websocket() {
    const rxWs = new RxWebSocket('wss://stage.decentgo.com:8090', (url, protocols) => new WebSocket(url, protocols, { rejectUnauthorized: false }));
/*
    rxWs.events
        .pipe(
            tap((value) => {
                // if (value instanceof OnOpen) value.webSocket.send('{"method":"call","params":[1,"login",["",""]],"id":3}')
                if (value instanceof OnOpen) value.webSocket.close()
                else if (value instanceof OnMessage) console.log("messsssss");
            }),
        )
        .subscribe((value) => console.log("value: ", value), (error) => console.log(error), () => console.log("complete"))
*/

    rxWs.makeRequest(new GetAccountByName("u961279ec8b7ae7bd62f304f7c1c3d345")).subscribe();
}

// some();
// serialize_account()
// accountById()
// accountByName()
websocket()
