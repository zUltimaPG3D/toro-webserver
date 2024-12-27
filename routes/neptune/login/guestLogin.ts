import {sha1} from "../../../hashes.ts";
import {getPlayer, User} from "../../../db.ts";

export const handler = async (req: Request): Promise<Response> => {
    const text = await req.text();
    const allData = new URLSearchParams(text);
    const platformUserId = allData.get("platformUserId") ?? "";

    if (platformUserId == "") {
        return new Response(JSON.stringify({"isSuccess": false, "msg": "Invalid platformUserId"}), {
            status: 200,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }

    const user:User = getPlayer(platformUserId);

    const gnidHash:string = await sha1(user.gnid);
    const loginTokenJson = {
        "success": true,
        "data": {
            "newGnidYn": (user.isNew ? "Y" : "N"),
            "gnidHash": gnidHash,
            "pfSessionToken": user.pfSessionToken,
            "countryCreated": "US",
            "policyAgreeInfo": {
                "termsAgreeUnixTS": user.termsAgreeTime,
                "privacyAgreeUnixTS": user.termsAgreeTime,
                "ageCheckCompletedUnixTS": user.termsAgreeTime,
                "privacyTransferAgreeUnixTS": user.termsAgreeTime,
                "nightPushAgreeYn": (user.agreedToPush ? "Y" : "N"),
                "nightPushAgreeUnixTS": user.pushAgreeTime,
                "pushAgreeYn": (user.agreedToPush ? "Y" : "N"),
                "pushAgreeUnixTS": user.pushAgreeTime,
                "needAgreePushYn": (user.agreedToPush ? "N" : "Y"),
                "needReAgreePolicyYn": (user.agreedToTerms ? "N" : "Y")
            },
            "linkedPlatformIdList": [
                99
            ]
        }
    }

    user.isNew = false;
    user.commit();

    return new Response(JSON.stringify(loginTokenJson), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}