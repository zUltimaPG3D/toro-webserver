import {UserHomeRequest, UserHomeResponse, PresentData, PresentType, Offer} from "../../../protobuf/generated/UserHome.ts";
import {CommonRequest, CommonResponse} from "../../../protobuf/generated/Common.ts";
import {basicPlayerInfo, bxSaveDataPath} from "../../../playerData.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = UserHomeRequest.decode(new Uint8Array(buffer));
    const responseMessage = UserHomeResponse.create();

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = basicPlayerInfo.pfSessionToken;
    responseMessage.friendWordList = [];
    responseMessage.loginbonusList = [];
    responseMessage.presentboxNum = 0;
    responseMessage.loginbonusNum = 0;
    responseMessage.offerList = [];

    return new Response(UserHomeResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}