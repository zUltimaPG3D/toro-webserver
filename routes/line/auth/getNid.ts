import {basicPlayerInfo} from "../../../playerData.ts";
import {Crypt} from "../../../bx/crypt.ts";

export const handler = async (req: Request): Promise<Response> => {
    const getNidData = {
        "gnidStatus": "OK",
        "blockReason": "",
        "countryCreated": "US",
        "nid": basicPlayerInfo.nid,
        "gnid": basicPlayerInfo.gnid,
    }

    const getNidJson = {
        "isSuccess": true,
        "data": await Crypt.encrypt(JSON.stringify(getNidData)),
    }

    return new Response(JSON.stringify(getNidJson), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}