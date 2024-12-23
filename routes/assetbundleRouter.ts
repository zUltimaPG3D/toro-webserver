import {serveBinaryFile, serveFile} from "../server.ts";

export const router = async (path:string, req:Request) => {
    if (path.startsWith("/assets/bundles/Android/")) {
        const filePath = "./assets" + path;
        try {
            await Deno.lstat(filePath);
            const mimeType = filePath.endsWith(".hash") ? "text/plain; charset=utf-8" : (filePath.endsWith(".json") ? "application/json; charset=utf-8" : "application/octet-stream; charset=binary");
            if (filePath.endsWith(".bundle")) {
                return await serveBinaryFile(filePath, mimeType);
            } else {
                return await serveFile(filePath, mimeType);
            }
        } catch (err) {
            if (!(err instanceof Deno.errors.NotFound)) {
                throw err;
            }
        }
    }
    switch (path) {
        case "/files/catalog.json":
            return await serveFile("./assets/files/catalog.json", "application/json; charset=utf-8");
        case "catalog_0.1.1.hash":
            return await serveFile("./assets/assets/bundles/Android/catalog_0.1.1.hash", "text/plain; charset=utf-8");
        case "/files/3472da8f5f0ecdc15ae131ffc321a860":
            return await serveBinaryFile("./assets/files/additionalawb.cpk", "application/octet-stream; charset=binary");
        case "/files/e4eca25358ed8d8c4619801aba79b5d2":
            return await serveBinaryFile("./assets/files/en_US_archive.zip", "application/zip; charset=binary");
        case "/files/53ef97cfb6cf245f6f30f12ec1ca7a3d":
            return await serveBinaryFile("./assets/files/ko_KR_archive.zip", "application/zip; charset=binary");
        case "/files/751310b495400082c71e04ea15f3e2b5":
            return await serveBinaryFile("./assets/files/zh_CN_archive.zip", "application/zip; charset=binary");
        case "/files/e04faecf811d5a89c23bdb7a443cae56":
            return await serveBinaryFile("./assets/files/zh_TW_archive.zip", "application/zip; charset=binary");
    }
    return null;
}