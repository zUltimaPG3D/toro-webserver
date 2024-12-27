import {Crypt} from "../../bx/crypt.ts";
import {getPlayerFromNID} from "../../db.ts";

export const handler = async (req: Request): Promise<Response> => {
    const text = await req.text();
    const allData = new URLSearchParams(text);

    const nid = allData.get("nid") ?? "0";
    const user = getPlayerFromNID(nid);

    if (user == null) {
        return new Response(JSON.stringify({
            "isSuccess": false,
        }), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    const coinRewardStr = allData.get("rewardCount") ?? "0";

    if (typeof coinRewardStr === "string") {
        const rewardCount = parseInt(coinRewardStr);
        if (rewardCount > 0) {
            user.coin += 50 + rewardCount;
            user.commit();
        }
    }

    const encryptedData = {
        "asset": {
            "coin": user.coin
        }
    }

    const response = {
        "isSuccess": true,
        "data": await Crypt.encrypt(JSON.stringify(encryptedData))
    }

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}