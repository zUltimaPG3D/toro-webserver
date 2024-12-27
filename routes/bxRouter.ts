import {handler as loginRoute} from "./bexide/account/login.ts";
import {handler as mstRoute} from "./bexide/account/masterData.ts";
import {handler as infoRoute} from "./bexide/user/info.ts";
import {handler as updateRoute} from "./bexide/user/update.ts";
import {handler as homeRoute} from "./bexide/user/home.ts";
import {handler as friendListRoute} from "./bexide/friend/list.ts";
import {handler as friendSearchRoute} from "./bexide/friend/search.ts";
import {handler as purchaseListRoute} from "./bexide/purchase/list.ts";
import {handler as presentListRoute} from "./bexide/present/list.ts";

export const router = async (path:string, req:Request) => {
    switch (path) {
        case "/api/account/login":
            return await loginRoute(req);
        case "/api/account/masterdata":
            return await mstRoute(req);
        case "/api/user/info":
            return await infoRoute(req);
        case "/api/user/update":
            return await updateRoute(req);
        case "/api/user/home":
            return await homeRoute(req);
        case "/api/friend/list":
            return await friendListRoute(req);
        case "/api/friend/search":
            return await friendSearchRoute(req);
        case "/api/purchase/list":
            return await purchaseListRoute(req);
        case "/api/present/list":
            return await presentListRoute(req);
    }
    return null;
}