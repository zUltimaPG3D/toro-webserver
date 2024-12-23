export const handler = async (req: Request): Promise<Response> => {
    return new Response(await Deno.readTextFile("./static/tos.html"), {
        status: 200,
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
    });
}