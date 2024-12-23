import {basicPlayerInfo} from "../../../playerData.ts";

export const handler = async (req: Request): Promise<Response> => {
    basicPlayerInfo.agreedToTerms = true;
    basicPlayerInfo.termsAgreeTime = Date.now();

    await basicPlayerInfo.commit();

    return new Response(JSON.stringify({"success": true, "isSuccess": true}), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}