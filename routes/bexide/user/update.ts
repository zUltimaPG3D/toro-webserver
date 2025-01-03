import {UserInfoResponse, UserUpdateRequest} from "../../../protobuf/generated/UserInfo.ts";
import {CommonResponse} from "../../../protobuf/generated/Common.ts";
import {getPlayerFromSessionToken} from "../../../db.ts";

export const handler = async (req: Request): Promise<Response> => {
    const buffer = await req.arrayBuffer();
    const requestMessage = UserUpdateRequest.decode(new Uint8Array(buffer));
    const responseMessage = UserInfoResponse.create();

    const accessToken = (req.headers.get("authorization") ?? "Bearer 00000000000000000000000000000000").substring("Bearer ".length);
    const user = getPlayerFromSessionToken(accessToken);
    if (user == null) {
        responseMessage.head = CommonResponse.create();
        responseMessage.head.code = 403;
        responseMessage.head.message = "User doesn't exist with that token";
        return new Response(UserInfoResponse.encode(responseMessage).finish(), {
            status: 200,
            headers: {
                "content-type": "application/x-protobuf",
            },
        });
    }

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = user.pfSessionToken;
    responseMessage.propertyList = requestMessage.propertyList;

    const wholeJson = UserUpdateRequest.toJSON(requestMessage);
    const json = JSON.parse(JSON.stringify(wholeJson)).propertyList;
    user.propertyList = JSON.stringify(json);
    user.commit();

    return new Response(UserInfoResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}