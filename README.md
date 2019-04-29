DCore SDK for JS
================

Set of APIs for accessing the DCore Blockchain.<br>
If you are looking for other platforms you can find info [below](#official-dcore-sdks-for-other-platforms).


Requirements
--------

- [Node.js & NPM](https://nodejs.org/)
- [secp256k1-node](https://github.com/cryptocoinjs/secp256k1-node)
- [RxJS](https://github.com/ReactiveX/RxJS)


Installation
--------

`npm install --save rxjs`<br>
`npm install --save git://github.com/DECENTfoundation/DCoreJS-SDK`

Make sure you import `reflect-metadata` in an entry class to your application, eg. `import "reflect-metadata";`

To enable debug logging you can use [`rxjs-spy`](https://www.npmjs.com/package/rxjs-spy).

Usage
--------

You can find example project with SDK usage [here](https://github.com/DECENTfoundation/DCore-SDK-Examples/tree/master/sdk-ts).

Use `DCoreSdk` to initialize the API.
The `DCoreApi` provides different groups of APIs for accessing the blockchain and default configuration values.

The supported operations are located in `ch.decent.sdk.model.operation` package, suffixed with `Operation` eg. `TransferOperation(...)`.
Use the `BroadcastApi` to apply the operations to DCore or use appropriate methods in APIs.

Access api using rest
```typescript
import "reflect-metadata";
import { DCoreSdk } from "../src/DCoreSdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/"})
// get account by name, resolves to account id '1.2.27'
const disposable = api.accountApi.get("public-account-9")
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
const api = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io/"));
// create account credentials
const credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");
// send 1DCT to account id '1.2.28 (public-account-10)' with encrypted 'hello memo' memo
const disposable = api.accountApi.transfer(credentials, "public-account-10", new AssetAmount(100000000), "hello memo")
    .subscribe((confirmation) => console.log(confirmation.id));
```

Official DCore SDKs for other platforms
----------

- [iOS/Swift](https://github.com/DECENTfoundation/DCoreSwift-SDK)
- [Android/Java/Kotlin](https://github.com/DECENTfoundation/DCoreKt-SDK)
- [PHP](https://github.com/DECENTfoundation/DCorePHP-SDK)
