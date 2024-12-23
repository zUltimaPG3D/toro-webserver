import {
    FriendSearchRequest,
    FriendSearchResponse,
    SupportAccount,
    FriendStatus
} from "../../../protobuf/generated/FriendList.ts";
import { CommonResponse } from "../../../protobuf/generated/Common.ts";
import { basicPlayerInfo } from "../../../playerData.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = FriendSearchRequest.decode(new Uint8Array(buffer));
    const responseMessage = FriendSearchResponse.create();

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = basicPlayerInfo.pfSessionToken;

    responseMessage.data = [];

    return new Response(FriendSearchResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}