import {
    PresentListRequest,
    PresentListResponse
} from "../../../protobuf/generated/PresentList.ts";
import { CommonResponse, PresentData, PresentType } from "../../../protobuf/generated/Common.ts";
import {getPlayerFromSessionToken} from "../../../db.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = PresentListRequest.decode(new Uint8Array(buffer));
    const responseMessage = PresentListResponse.create();

    const accessToken = (req.headers.get("authorization") ?? "Bearer 00000000000000000000000000000000").substring("Bearer ".length);
    const user = getPlayerFromSessionToken(accessToken);
    if (user == null) {
        responseMessage.head = CommonResponse.create();
        responseMessage.head.code = 403;
        responseMessage.head.message = "User doesn't exist with that token";
        return new Response(PresentListResponse.encode(responseMessage).finish(), {
            status: 200,
            headers: {
                "content-type": "application/x-protobuf",
            },
        });
    }

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = user.pfSessionToken;

    responseMessage.presentList = [];

    return new Response(PresentListResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}