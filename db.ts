import { DB, Row } from "https://deno.land/x/sqlite/mod.ts";

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

export class User {
    userId: string = "";
    nid: string = "1";
    gnid: string = "1";
    pfSessionToken: string = "tokenHere";
    agreedToPush: boolean = false;
    agreedToTerms: boolean = false;
    pushAgreeTime: number = 0;
    termsAgreeTime: number = 0;
    isNew: boolean = true;
    coin: number = 0;
    propertyList: string = "[]";

    public commit() {
        if (this.existsOnDB()) {
            this.updateOnDB();
        } else {
            this.createOnDB();
        }
    }

    public existsOnDB() {
        const stmt = db.prepareQuery("SELECT * FROM users WHERE userId = ?");
        const rows = stmt.all([this.userId]);
        stmt.finalize();
        return rows.length > 0;
    }

    private updateOnDB() {
        const stmt = db.prepareQuery("UPDATE users SET nid = ?, gnid = ?, pfSessionToken = ?, agreedToPush = ?, agreedToTerms = ?, pushAgreeTime = ?, termsAgreeTime = ?, isNew = ?, coin = ?, propertyList = ? WHERE userId = ?");
        stmt.execute([
            this.nid,
            this.gnid,
            this.pfSessionToken,
            this.agreedToPush,
            this.agreedToTerms,
            this.pushAgreeTime,
            this.termsAgreeTime,
            this.isNew,
            this.coin,
            this.propertyList,
            this.userId
        ]);
        stmt.finalize();
    }

    private createOnDB() {
        const stmt = db.prepareQuery("INSERT INTO users (userId, nid, gnid, pfSessionToken, agreedToPush, agreedToTerms, pushAgreeTime, termsAgreeTime, isNew, coin, propertyList) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        stmt.execute([
            this.userId,
            this.nid,
            this.gnid,
            this.pfSessionToken,
            this.agreedToPush,
            this.agreedToTerms,
            this.pushAgreeTime,
            this.termsAgreeTime,
            this.isNew,
            this.coin,
            this.propertyList
        ]);
        stmt.finalize();
    }
    
    static fromRow(row: Row) {
        const user:User = new User();

        user.userId = row[0] as string;
        user.nid = row[1] as string;
        user.gnid = row[2] as string;
        user.pfSessionToken = row[3] as string;
        user.agreedToPush = row[4] as boolean;
        user.agreedToTerms = row[5] as boolean;
        user.pushAgreeTime = row[6] as number;
        user.termsAgreeTime = row[7] as number;
        user.isNew = row[8] as boolean;
        user.coin = row[9] as number;
        user.propertyList = row[10] as string;
        return user;
    }
}

export async function getDB() {
    const db = new DB("./player_data/db.sqlite");

    db.query(await Deno.readTextFile("./migrations/001_create_users.sql"));

    return db;
}


export const db = await getDB();

export function getPlayer(userId: string) {
    const user = new User();

    user.userId = userId;

    if (user.existsOnDB()) {
        const stmt = db.prepareQuery("SELECT * FROM users WHERE userId = ?");
        const info = stmt.one([user.userId]);
        stmt.finalize();

        return User.fromRow(info);
    } else {
        return createPlayer(userId);
    }
}

export function getPlayerFromSessionToken(sessionToken: string) {
    const stmt = db.prepareQuery("SELECT * FROM users WHERE pfSessionToken = ?");
    try {
        const info = stmt.one([sessionToken]);
        stmt.finalize();
        return User.fromRow(info);
    } catch (e) {
        stmt.finalize();
        return null;
    }
}

export function getPlayerFromIDs(nid: string, gnid: string) {
    const stmt = db.prepareQuery("SELECT * FROM users WHERE nid = ? AND gnid = ?");
    try {
        const info = stmt.one([nid, gnid]);
        stmt.finalize();
        return User.fromRow(info);
    } catch (e) {
        stmt.finalize();
        return null;
    }
}

export function getPlayerFromNID(nid: string) {
    const stmt = db.prepareQuery("SELECT * FROM users WHERE nid = ?");
    try {
        const info = stmt.one([nid]);
        stmt.finalize();
        return User.fromRow(info);
    } catch (e) {
        stmt.finalize();
        return null;
    }
}

function createPlayer(userId: string) {
    const user = new User();

    user.userId = userId;
    user.nid = generateID();
    user.gnid = generateID();
    user.pfSessionToken = generateSessionToken();
    user.agreedToPush = false;
    user.agreedToTerms = false;
    user.pushAgreeTime = 0;
    user.termsAgreeTime = 0;
    user.isNew = true;
    user.coin = 0;
    user.propertyList = "[]";

    user.commit();
    return user;
}
