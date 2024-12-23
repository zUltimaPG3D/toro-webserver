class BasicPlayerInfo {
    nid: string = "1";
    gnid: string = "1";
    pfSessionToken: string = "tokenHere";

    agreedToPush: boolean = false;
    agreedToTerms: boolean = false;
    pushAgreeTime: number = 0;
    termsAgreeTime: number = 0;

    isNew: boolean = true;

    constructor(nid:string, gnid:string, pfSessionToken:string, agreedToPush: boolean, agreedToTerms: boolean, pushAgreeTime: number, termsAgreeTime: number, isNew: boolean) {
        this.nid = nid;
        this.gnid = gnid;
        this.pfSessionToken = pfSessionToken;
        this.agreedToPush = agreedToPush;
        this.agreedToTerms = agreedToTerms;
        this.pushAgreeTime = pushAgreeTime;
        this.termsAgreeTime = termsAgreeTime;
        this.isNew = isNew;
    }

    async commit() {
        await Deno.writeTextFile(basicDataPath, JSON.stringify(this));
    }

    static async load(): Promise<BasicPlayerInfo> {
        const data = await Deno.readTextFile(basicDataPath);
        const parsedData = JSON.parse(data);

        return new BasicPlayerInfo(
            parsedData.nid,
            parsedData.gnid,
            parsedData.pfSessionToken,
            parsedData.agreedToPush,
            parsedData.agreedToTerms,
            parsedData.pushAgreeTime,
            parsedData.termsAgreeTime,
            parsedData.isNew
        );
    }
}

class BXUser {
    coin: number = 0;

    constructor(coin: number) {
        this.coin = coin;
    }

    async commit() {
        await Deno.writeTextFile(bxUserDataPath, JSON.stringify(this));
    }

    static async load(): Promise<BXUser> {
        const data = await Deno.readTextFile(bxUserDataPath);
        const parsedData = JSON.parse(data);

        return new BXUser(parsedData.coin);
    }
}

export const basicDataPath: string = "./player_data/basic.json";
export const bxUserDataPath: string = "./player_data/bxUser.json";
export const bxSaveDataPath: string = "./player_data/bxSave.json";

function generateID(): string {
    const digits = '0123456789';
    let result = '';

    for (let i = 0; i < 19; i++) {
        const randomIndex = crypto.getRandomValues(new Uint8Array(1))[0] % 10;
        result += digits[randomIndex];
    }

    return result;
}

function generateSessionToken(): string {
    const digits = '0123456789abcdef';
    let result = '';

    for (let i = 0; i < 32; i++) {
        const randomIndex = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
        result += digits[randomIndex];
    }

    return result;
}

export const getPlayerData = async (): Promise<BasicPlayerInfo> => {
    try {
        await Deno.lstat(basicDataPath);
        return await BasicPlayerInfo.load();
    } catch (err) {
        if (!(err instanceof Deno.errors.NotFound)) {
            throw err;
        }

        const data = new BasicPlayerInfo(
            generateID(), generateID(), generateSessionToken(), false, false, 0,  0, true
        );

        await data.commit();
        return data;
    }
};

export const getBXUser = async (): Promise<BXUser> => {
    try {
        await Deno.lstat(bxUserDataPath);
        return await BXUser.load();
    } catch (err) {
        if (!(err instanceof Deno.errors.NotFound)) {
            throw err;
        }

        const data = new BXUser(
            0
        );

        await data.commit();
        return data;
    }
};

async function ensureBasicPlayerData() {
    try {
        await Deno.lstat(basicDataPath);
        await Deno.lstat(bxUserDataPath);
    } catch (err) {
        if (!(err instanceof Deno.errors.NotFound)) {
            throw err;
        }

        basicPlayerInfo = await getPlayerData();
        bxUserInfo = await getBXUser();
    }
}

export const ensureAllPlayerData = async () => {
    await ensureBasicPlayerData();
};

export let basicPlayerInfo = await getPlayerData();
export let bxUserInfo = await getBXUser();