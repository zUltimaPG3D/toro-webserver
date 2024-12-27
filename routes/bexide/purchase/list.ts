import {
    PurchaseListRequest,
    PurchaseListResponse,
    ProductItem,
    Purchase
} from "../../../protobuf/generated/PurchaseList.ts";
import { CommonResponse } from "../../../protobuf/generated/Common.ts";
import {getPlayerFromSessionToken} from "../../../db.ts";

export async function handler(req: Request): Promise<Response> {
    const buffer = await req.arrayBuffer();
    const requestMessage = PurchaseListRequest.decode(new Uint8Array(buffer));
    const responseMessage = PurchaseListResponse.create();

    const accessToken = (req.headers.get("authorization") ?? "Bearer 00000000000000000000000000000000").substring("Bearer ".length);
    const user = getPlayerFromSessionToken(accessToken);
    if (user == null) {
        responseMessage.head = CommonResponse.create();
        responseMessage.head.code = 403;
        responseMessage.head.message = "User doesn't exist with that token";
        return new Response(PurchaseListResponse.encode(responseMessage).finish(), {
            status: 200,
            headers: {
                "content-type": "application/x-protobuf",
            },
        });
    }

    responseMessage.head = CommonResponse.create();
    responseMessage.head.code = 0;
    responseMessage.head.accessToken = user.pfSessionToken;

    responseMessage.productList = [];
    responseMessage.purchaseList = [];

    return new Response(PurchaseListResponse.encode(responseMessage).finish(), {
        status: 200,
        headers: {
            "content-type": "application/x-protobuf",
        },
    });
}