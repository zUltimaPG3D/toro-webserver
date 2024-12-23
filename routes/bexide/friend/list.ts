import {
    FriendListRequest,
    FriendListResponse,
    SupportAccount,
    FriendStatus
} from "../../../protobuf/generated/FriendList.ts";
import { CommonResponse } from "../../../protobuf/generated/Common.ts";
import { basicPlayerInfo } from "../../../playerData.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = FriendListRequest.decode(new Uint8Array(buffer));
    const responseMessage = FriendListResponse.create();

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = basicPlayerInfo.pfSessionToken;

    responseMessage.data = [];

    return new Response(FriendListResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}