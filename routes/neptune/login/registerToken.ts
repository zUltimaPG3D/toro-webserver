import {basicPlayerInfo} from "../../../playerData.ts";

export const handler = async (req: Request): Promise<Response> => {
    basicPlayerInfo.agreedToPush = true;
    basicPlayerInfo.pushAgreeTime = Date.now();

    await basicPlayerInfo.commit();

    let passedToken:string;
    if (req.body == null) {
        passedToken = "pushToken:here";
    } else {
        const allData = new URLSearchParams(await req.text());
        const tokenEntry = allData.get("pushToken");
        if (typeof tokenEntry === "string") {
            passedToken = tokenEntry;
        } else {
            passedToken = "pushToken:here";
        }
    }

    console.log(passedToken);

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