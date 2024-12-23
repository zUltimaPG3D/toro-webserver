import {
    AccountLoginRequest,
    AccountLoginResponse,
    ExpireStatus,
    Status
} from "../../../protobuf/generated/AccountLogin.ts";
import { CommonResponse } from "../../../protobuf/generated/Common.ts";
import { basicPlayerInfo } from "../../../playerData.ts";
import { PlayerSummary } from "../../../protobuf/generated/PlayerSummary.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = AccountLoginRequest.decode(new Uint8Array(buffer));
    const responseMessage = AccountLoginResponse.create();

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = basicPlayerInfo.pfSessionToken;
    responseMessage.publicId = requestMessage.publicId;
    responseMessage.master = 0;
    responseMessage.resource = 0;
    responseMessage.isSavedataExpired = 0;
    responseMessage.status = Status.STATUS_NORMAL;
    responseMessage.redirectHost = "";
    responseMessage.playerSummary = PlayerSummary.create();
    responseMessage.expireStatus = ExpireStatus.EXPIRE_STATUS_NONE;

    return new Response(AccountLoginResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}