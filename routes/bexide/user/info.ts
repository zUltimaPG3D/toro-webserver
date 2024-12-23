import {
    UserInfoRequest,
    UserInfoResponse,
    UserProperty
} from "../../../protobuf/generated/UserInfo.ts";
import { CommonResponse } from "../../../protobuf/generated/Common.ts";
import {basicPlayerInfo, bxSaveDataPath} from "../../../playerData.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = UserInfoRequest.decode(new Uint8Array(buffer));
    const responseMessage = UserInfoResponse.create();

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = basicPlayerInfo.pfSessionToken;
    try {
        await Deno.lstat(bxSaveDataPath);
        responseMessage.propertyList = [];

        const data = await Deno.readTextFile(bxSaveDataPath);
        const parsedData = JSON.parse(data);
        const propertyList = parsedData.propertyList;
        for (const prop of propertyList) {
            const property = UserProperty.create();
            property.key = prop.key;
            property.value = prop.value;
            responseMessage.propertyList.push(property);
        }

        console.log("[+] Response: ", JSON.stringify(UserInfoResponse.toJSON(responseMessage)));
    } catch (err) {
        if (!(err instanceof Deno.errors.NotFound)) {
            throw err;
        }
        responseMessage.propertyList = [];
    }

    return new Response(UserInfoResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}