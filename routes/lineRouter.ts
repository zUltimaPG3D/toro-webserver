import {handler as syncBalanceRoute} from "./line/syncBalance.ts";
import {serveJson} from "../server.ts";
import {handler as modifyCoinRoute} from "./line/modifyCoin.ts";
import {handler as sendLogRoute} from "./line/logging/sendLog.ts";
import {handler as getNidRoute} from "./line/auth/getNid.ts";

export const router = async (path:string, req:Request) => {
    switch (path) {
        case "/linegames_log/sendlog":
            return await sendLogRoute(req);
        case "/linegames/getnid":
            return await getNidRoute(req);
        case "/linegames/SyncBalance":
            return await syncBalanceRoute(req);
        case "/linegames/cacheClientInfo":
            return await serveJson({
                "isSuccess": true
            });
        case "/linegames/modifycoin":
            return await modifyCoinRoute(req);
    }
    return null;
}