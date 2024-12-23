import {config} from "../../../config.ts";

const tos_url = config.ip + ":" + config.port + "/tos";

const addr = config.schema + "://" + config.ip + ":" + config.port + "/";

const clientVersionInfoJson = {
    "isSuccess": true,
    "data": {
        "client_version_status": config.game_status,
        "server_addr": addr,
        "patch_addr": addr,
        "countryInfo": {
            "countryCd": "US",
            "gdprTargetYn": "N",
        },
        "countryTermsInfos": [
            {
                "cd": "TERMS_OF_SERVICES",
                "required": true,
                "url": tos_url,
            },
            {
                "cd": "PRIVACY_POLICY",
                "required": true,
                "url": tos_url,
            },
            {
                "cd": "PRIVACY_POLICY_FULLTEXT",
                "required": true,
                "url": tos_url,
            },
            {
                "cd": "USE_OF_PUSH_NOTIFICATIONS",
                "required": false,
                "url": tos_url,
            },
        ],
        "maintenance_msg": config.maintenance_message,
        "guest_mode_on_yn": "Y",
        "applied_white_yn": "Y",
        "customValue": "",
        "out_link_url": addr
    }
}

export const handler = async (req: Request): Promise<Response> => {
    return new Response(JSON.stringify(clientVersionInfoJson), {
        status: 200,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
    });
}