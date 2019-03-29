DCore SDK for JS
================

Set of APIs for accessing the DCore Blockchain.

Download
--------

`npm install --save git+ssh://git@github.com/DECENTfoundation/DCoreJS-SDK`

Setup
--------

Make sure you import `reflect-metadata` in an entry class to your application, eg. `import "reflect-metadata";`

To enable debug logging you can use [`rxjs-spy`](https://www.npmjs.com/package/rxjs-spy).

Usage
--------

Use `DCoreSdk` to initialize the API.
The `DCoreApi` provides different groups of APIs for accessing the blockchain and default configuration values.

The supported operations are located in `ch.decent.sdk.model.operation` package, suffixed with `Operation` eg. `TransferOperation(...)`.
Use the `BroadcastApi` to apply the operations to DCore or use appropriate methods in APIs.

Access api using rest
```typescript
import "reflect-metadata";
import { DCoreSdk } from "../src/DCoreSdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://stagesocket.decentgo.com:8090/rpc"})
// get account by name, resolves to account id '1.2.34'
const disposable = api.accountApi.get("u961279ec8b7ae7bd62f304f7c1c3d345")
    .subscribe((account) => console.log(account.id));
```

Access api using websocket
```typescript
import "reflect-metadata";
import * as WebSocket from "isomorphic-ws";
import { Credentials } from "../src/crypto/Credentials";
import { DCoreSdk } from "../src/DCoreSdk";
import { AssetAmount } from "../src/models/AssetAmount";
import { ChainObject } from "../src/models/ChainObject";
import { create } from "rxjs-spy";

// init rxjs-spy and log all tags
const spy = create();
spy.log();

// create api for websocket
const api = DCoreSdk.createForWebSocket(() => new WebSocket("wss://stagesocket.decentgo.com:8090"));
// create account credentials
const credentials = new Credentials(ChainObject.parse("1.2.34"), "..wif_private_key..");
// send 1DCT to account id '1.2.35' with encrypted 'hello memo' memo
const disposable = api.accountApi.transfer(credentials, "1.2.35", new AssetAmount(100000000), "hello memo")
    .subscribe((confirmation) => console.log(confirmation.id));
```

References
----------
