import {Crypt} from "../../bx/crypt.ts";
import {getPlayerFromIDs} from "../../db.ts";

export const handler = async (req: Request): Promise<Response> => {
    const text = await req.text();
    const allData = new URLSearchParams(text);
    const nid = allData.get("nid") ?? "0";
    const gnid = allData.get("gnid") ?? "0";

    if (nid == "0" || gnid == "0") {
        return new Response(JSON.stringify({"isSuccess": false}), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    const user = getPlayerFromIDs(nid, gnid);
    if (user == null) {
        return new Response(JSON.stringify({"isSuccess": false}), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    const balanceInfo = {
        "asset": {
            "coin": user.coin
        }
    }

    const response = {
        "isSuccess": true,
        "data": await Crypt.encrypt(JSON.stringify(balanceInfo))
    }

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}