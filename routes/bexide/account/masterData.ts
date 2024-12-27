import {
    MasterDataRequest,
    MasterDataResponse,
    MasterData
} from "../../../protobuf/generated/MasterData.ts";
import { CommonResponse } from "../../../protobuf/generated/Common.ts";
import {getAllMstPackages} from "../../../bx/masterData.ts";
import {getPlayerFromSessionToken} from "../../../db.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = MasterDataRequest.decode(new Uint8Array(buffer));
    const responseMessage = MasterDataResponse.create();

    const accessToken = (req.headers.get("authorization") ?? "Bearer 00000000000000000000000000000000").substring("Bearer ".length);
    const user = getPlayerFromSessionToken(accessToken);
    if (user == null) {
        responseMessage.head = CommonResponse.create();
        responseMessage.head.code = 403;
        responseMessage.head.message = "User doesn't exist with that token";
        return new Response(MasterDataResponse.encode(responseMessage).finish(), {
            status: 200,
            headers: {
                "content-type": "application/x-protobuf",
            },
        });
    }

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = user.pfSessionToken;
    responseMessage.data = [];

    const masterDataJson = await getAllMstPackages();

    for (const mstData of masterDataJson) {
        const masterData = MasterData.create();
        masterData.name = mstData.name;
        masterData.hash = mstData.hash;
        masterData.url = mstData.url;
        masterData.size = mstData.size;
        responseMessage.data.push(masterData);
    }

    return new Response(MasterDataResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}