import {basicPlayerInfo} from "../../../playerData.ts";
import {sha1} from "../../../hashes.ts";

export const handler = async (req: Request): Promise<Response> => {
    const gnidHash:string = await sha1(basicPlayerInfo.gnid);
    const loginTokenJson = {
        "success": true,
        "data": {
            "newGnidYn": (basicPlayerInfo.isNew ? "Y" : "N"),
            "gnidHash": gnidHash,
            "pfSessionToken": basicPlayerInfo.pfSessionToken,
            "countryCreated": "US",
            "policyAgreeInfo": {
                "termsAgreeUnixTS": basicPlayerInfo.termsAgreeTime,
                "privacyAgreeUnixTS": basicPlayerInfo.termsAgreeTime,
                "ageCheckCompletedUnixTS": basicPlayerInfo.termsAgreeTime,
                "privacyTransferAgreeUnixTS": basicPlayerInfo.termsAgreeTime,
                "nightPushAgreeYn": (basicPlayerInfo.agreedToPush ? "Y" : "N"),
                "nightPushAgreeUnixTS": basicPlayerInfo.pushAgreeTime,
                "pushAgreeYn": (basicPlayerInfo.agreedToPush ? "Y" : "N"),
                "pushAgreeUnixTS": basicPlayerInfo.pushAgreeTime,
                "needAgreePushYn": (basicPlayerInfo.agreedToPush ? "N" : "Y"),
                "needReAgreePolicyYn": (basicPlayerInfo.agreedToTerms ? "N" : "Y")
            },
            "linkedPlatformIdList": [
                99
            ]
        }
    }

    basicPlayerInfo.isNew = false;
    await basicPlayerInfo.commit();

    return new Response(JSON.stringify(loginTokenJson), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}