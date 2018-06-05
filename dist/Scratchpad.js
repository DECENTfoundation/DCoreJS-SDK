"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const Account_1 = require("./models/Account");
const Asset_1 = require("./models/Asset");
const Authority_1 = require("./models/Authority");
const PubKey_1 = require("./models/PubKey");
const k = new PubKey_1.PubKey();
k.key = 13456;
console.log(class_transformer_1.serialize(k));
console.log(k);
const kk = class_transformer_1.deserialize(PubKey_1.PubKey, "{ \"s\": \"13213546.\" }");
console.log(kk);
const account = class_transformer_1.plainToClass(Account_1.Account, {
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
// console.log(account)
// console.log(account.active)
const aa = class_transformer_1.plainToClass(Authority_1.Authority, {
    "weight_threshold": 1,
    "account_auths": [],
    "key_auths": [
        [
            "DCT6MA5TQQ6UbMyMaLPmPXE2Syh5G3ZVhv5SbFedqLPqdFChSeqTz",
            1
        ]
    ]
});
console.log(aa);
console.log(class_transformer_1.serialize(aa));
console.log("hello world");
const op = new Asset_1.Asset({ symbol: "USB" });
console.log(op);
//# sourceMappingURL=Scratchpad.js.map