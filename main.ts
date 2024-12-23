import { handler as tosRoute } from "./routes/other/tos.ts";
import { router as neptuneRouter } from "./routes/neptuneRouter.ts";
import { router as lineRouter } from "./routes/lineRouter.ts";
import { router as bxRouter } from "./routes/bxRouter.ts";
import { router as assetbundleRouter } from "./routes/assetbundleRouter.ts";
import { ensureAllPlayerData } from "./playerData.ts";
import { config } from "./config.ts";

if (import.meta.main) {
  Deno.serve({ port:config.port }, async (req) => {
    const url = new URL(req.url);
    let path = url.pathname;
    if (path.startsWith("//")) {
      path = path.substring(1);
    }
    await ensureAllPlayerData();

    const neptune = await neptuneRouter(path, req);
    if (neptune != null) {
      console.log("[+] NeptuneSDK request made to " + path);
      return neptune;
    }

    const line = await lineRouter(path, req);
    if (line != null) {
      console.log("[+] LineSDK request made to " + path);
      return line;
    }

    const bx = await bxRouter(path, req);
    if (bx != null) {
      console.log("[+] BX request made to " + path);
      return bx;
    }

    const assetbundle = await assetbundleRouter(path, req);
    if (assetbundle != null) {
      console.log("[+] AssetBundle request made to " + path);
      return assetbundle;
    }

    console.log("[+] Generic request made to " + path);

    switch (path) {
      case "/tos":
        return await tosRoute(req);
      default:
        console.log("[-] Request to " + path + " dropped");
        return new Response("404 Not Found", { status: 404 });
    }
  });
}
