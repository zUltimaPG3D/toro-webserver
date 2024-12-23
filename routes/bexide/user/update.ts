import {UserInfoResponse, UserUpdateRequest} from "../../../protobuf/generated/UserInfo.ts";
import {CommonResponse} from "../../../protobuf/generated/Common.ts";
import {bxSaveDataPath} from "../../../playerData.ts";

export const handler = async (req: Request): Promise<Response> => {
    const buffer = await req.arrayBuffer();
    const requestMessage = UserUpdateRequest.decode(new Uint8Array(buffer));
    const responseMessage = UserInfoResponse.create();

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.propertyList = requestMessage.propertyList;

    const json = UserUpdateRequest.toJSON(requestMessage);
    await Deno.writeTextFile(bxSaveDataPath, JSON.stringify(json));

    return new Response(UserInfoResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}