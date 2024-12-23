import {Crypt} from "../../bx/crypt.ts";
import { bxUserInfo } from "../../playerData.ts";

export const handler = async (req: Request): Promise<Response> => {
    const text = await req.text();
    const allData = new URLSearchParams(text);
    const coinRewardStr = allData.get("rewardCount") ?? "0";
    console.log("[i] rewardCount:", coinRewardStr);

    if (typeof coinRewardStr === "string") {
        const rewardCount = parseInt(coinRewardStr);
        if (rewardCount > 0) {
            bxUserInfo.coin += 50 + rewardCount;
            await bxUserInfo.commit();
        }
    }

    const encryptedData = {
        "asset": {
            "coin": bxUserInfo.coin
        }
    }

    const response = {
        "isSuccess": true,
        "data": await Crypt.encrypt(JSON.stringify(encryptedData))
    }

    console.log("[i] new coins:", bxUserInfo.coin);

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}