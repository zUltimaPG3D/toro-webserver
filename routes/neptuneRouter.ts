import {handler as verInfoRoute} from "./neptune/info/getClientVersionInfo.ts";
import {handler as useListRoute} from "./neptune/info/useList.ts";
import {handler as gameServerListRoute} from "./neptune/info/gameServerList.ts";
import {handler as guestLoginRoute} from "./neptune/login/guestLogin.ts";
import {handler as policyAgreeRoute} from "./neptune/login/policyAgree.ts";
import {handler as registerTokenRoute} from "./neptune/login/registerToken.ts";

export const router = async (path:string, req: Request) => {
    switch (path) {
        case "/api/api_version/getClientVersionInfo":
            return await verInfoRoute(req);
        case "/api/langCulture/game/useList":
            return await useListRoute(req);
        case "/api/gameServer/list":
            return await gameServerListRoute(req);
        case "/api/v1/login/guest/getLoginToken":
            return await guestLoginRoute(req);
        case "/api/policy/v2/nid/agree/request/byPfSessionToken/forClient":
            return await policyAgreeRoute(req);
        case "/api/v1/push/token/register/forClient":
            return await registerTokenRoute(req);
    }
    return null;
}