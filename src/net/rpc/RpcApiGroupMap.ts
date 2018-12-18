import { ApiGroup } from "../models/ApiGroup";

// 0 - database
// 1 - login
// 2 - network
// 3 - history
// 4 - crypto
// 5 - messaging

export const RpcApiGroupMap = new Map<ApiGroup, number>([
    [ApiGroup.Database, 0],
    [ApiGroup.Login, 1],
    [ApiGroup.History, 3],
]);
