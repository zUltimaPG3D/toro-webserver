import {getPlayerFromSessionToken, User} from "../../../db.ts";

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

    user.agreedToTerms = true;
    user.termsAgreeTime = Date.now();

    user.commit();

    return new Response(JSON.stringify({"success": true, "isSuccess": true}), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}