import {Crypt} from "../../../bx/crypt.ts";
import {getPlayerFromSessionToken} from "../../../db.ts";

export const handler = async (req: Request): Promise<Response> => {
    const text = await req.text();
    const allData = new URLSearchParams(text);
    const pfSessionToken = allData.get("pfSessionToken") ?? "";

    if (pfSessionToken == "") {
        return new Response(JSON.stringify({"isSuccess": false}), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    const user = getPlayerFromSessionToken(pfSessionToken);
    if (user == null) {
        return new Response(JSON.stringify({"isSuccess": false}), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    const getNidData = {
        "gnidStatus": "OK",
        "blockReason": "",
        "countryCreated": "US",
        "nid": user.nid,
        "gnid": user.gnid,
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