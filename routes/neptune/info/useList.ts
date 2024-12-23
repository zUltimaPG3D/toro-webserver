const useListJson = {
    "isSuccess": true,
    "data": [
        {
            "langCulture": "ko_KR",
            "name": "한국어(대한민국)",
            "displayName": "한국어"
        },
        {
            "langCulture": "en_US",
            "name": "영어(미국)",
            "displayName": "English"
        },
        {
            "langCulture": "ja_JP",
            "name": "일본어(일본)",
            "displayName": "日本語"
        },
        {
            "langCulture": "zh_CN",
            "name": "중국어 간체(중국)",
            "displayName": "中文"
        }
    ]
}

export const handler = async (req: Request): Promise<Response> => {
    return new Response(JSON.stringify(useListJson), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}