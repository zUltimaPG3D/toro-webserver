import {bxUserInfo} from "../../playerData.ts";
import {Crypt} from "../../bx/crypt.ts";

export const handler = async (req: Request): Promise<Response> => {
    const balanceInfo = {
        "asset": {
            "coin": bxUserInfo.coin
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