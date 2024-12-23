const gameServerListJson = {
    "isSuccess": true,
    "data": [
        {
            "gameServerId": "toro-webserver",
            "gameServerNm": "toro-webserver",
        }
    ]
}

export const handler = async (req: Request): Promise<Response> => {
    return new Response(JSON.stringify(gameServerListJson), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}