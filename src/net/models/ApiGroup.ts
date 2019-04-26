// 0 - database
// 1 - login
// 2 - network
// 3 - history
// 4 - crypto
// 5 - messaging

export enum ApiGroup {
    Database = 0,
    Login,
    Broadcast,
    History,
    Cryto,
    Messaging,
}

export const API_GROUP_NAMES = [
    "database",
    "login",
    "network_broadcast",
    "history",
    "crypto",
    "messaging",
];
