import {
    PurchaseListRequest,
    PurchaseListResponse,
    ProductItem,
    Purchase
} from "../../../protobuf/generated/PurchaseList.ts";
import { CommonResponse } from "../../../protobuf/generated/Common.ts";
import { basicPlayerInfo } from "../../../playerData.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = PurchaseListRequest.decode(new Uint8Array(buffer));
    const responseMessage = PurchaseListResponse.create();

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = basicPlayerInfo.pfSessionToken;

    responseMessage.productList = [];
    responseMessage.purchaseList = [];

    return new Response(PurchaseListResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}