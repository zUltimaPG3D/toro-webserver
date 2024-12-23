export const serveFile = async (path:string, mime:string): Promise<Response> => {
    return new Response(await Deno.readTextFile(path), {
        status: 200,
        headers: {
            "content-type": mime,
        },
    })
}

export const serveBinaryFile = async (path:string, mime:string): Promise<Response> => {
    return new Response(await Deno.readFile(path), {
        status: 200,
        headers: {
            "content-type": mime,
        },
    })
}


export const serveJson = async (json:any) : Promise<Response> => {
    return new Response(JSON.stringify(json), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    })
}