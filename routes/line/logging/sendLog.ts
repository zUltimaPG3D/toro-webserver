export const handler = async (req: Request): Promise<Response> => {
    return new Response(JSON.stringify({
        "success": true,
        "isSuccess": true
    }), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}