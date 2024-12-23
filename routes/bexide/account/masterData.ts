import {
    MasterDataRequest,
    MasterDataResponse,
    MasterData
} from "../../../protobuf/generated/MasterData.ts";
import { CommonResponse } from "../../../protobuf/generated/Common.ts";
import { basicPlayerInfo } from "../../../playerData.ts";
import {getAllMstPackages} from "../../../bx/masterData.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = MasterDataRequest.decode(new Uint8Array(buffer));
    const responseMessage = MasterDataResponse.create();

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = basicPlayerInfo.pfSessionToken;
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