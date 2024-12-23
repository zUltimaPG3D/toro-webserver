import readTextFile = Deno.readTextFile;

interface Config {
    schema: string;
    ip: string;
    port: number;
    game_status: string;
    maintenance_message: string;
}

export async function loadConfig(): Promise<Config> {
    const configData = await readTextFile("./config.json");
    return JSON.parse(configData);
}

export const config = await loadConfig();