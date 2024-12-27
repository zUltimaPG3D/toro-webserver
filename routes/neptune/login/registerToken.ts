import {getPlayerFromSessionToken} from "../../../db.ts";

export const handler = async (req: Request): Promise<Response> => {
    const text = await req.text();
    const allData = new URLSearchParams(text);
    const pfSessionToken = allData.get("pfSessionToken") ?? "";

    if (pfSessionToken == "") {
        return new Response(JSON.stringify({"success": false, "isSuccess": false}), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    const user = getPlayerFromSessionToken(pfSessionToken);
    if (user == null) {
        return new Response(JSON.stringify({"success": false, "isSuccess": false}), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    user.agreedToPush = true;
    user.pushAgreeTime = Date.now();

    user.commit();

    const passedToken = allData.get("pushToken") ?? "pushToken:here";

    return new Response(JSON.stringify({
        "isSuccess": true,
        "msg": "Successfully registered push token",
        "success": true,
        "data": {
            "pushToken": passedToken
        }
    }), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}