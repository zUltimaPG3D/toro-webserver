class Crypt {
    static m_Key = "AehiP1hohphe4ith6ievoh4saht3aeca";
    static m_IV = "eiGadaegungoo0gu";
    static m_plainTextHead = "bx70test1";

    static initialize(key: string, iv: string, head: string) {
        this.m_Key = key;
        this.m_IV = iv;
        this.m_plainTextHead = head;
    }

    static async encrypt(uid: string): Promise<string> {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(this.m_Key);
        const ivData = encoder.encode(this.m_IV);

        const plainText = this.m_plainTextHead + uid;

        const textData = encoder.encode(plainText);

        const cryptoKey = await crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "AES-CBC" },
            false,
            ["encrypt"]
        );

        const encryptedBuffer = await crypto.subtle.encrypt(
            { name: "AES-CBC", iv: ivData },
            cryptoKey,
            textData
        );

        return this.bufferToBase64(encryptedBuffer);
    }

    private static removePadding(data: Uint8Array): Uint8Array {
        let lastIndex = data.length;
        while (lastIndex > 0 && data[lastIndex - 1] === 0) {
            lastIndex--;
        }
        return data.slice(0, lastIndex);
    }

    static async decrypt(src: string): Promise<string> {
        const textEncoder = new TextEncoder();
        const textDecoder = new TextDecoder();

        const key = await crypto.subtle.importKey(
            "raw",
            textEncoder.encode(this.m_Key).slice(0, 32),
            "AES-CBC",
            false,
            ["decrypt"]
        );

        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-CBC", iv: textEncoder.encode(this.m_IV).slice(0, 16) },
            key,
            Uint8Array.from(atob(src), c => c.charCodeAt(0))
        );

        const unpaddedData = this.removePadding(new Uint8Array(decrypted));
        let decryptedText = textDecoder.decode(unpaddedData);

        if (decryptedText.toLowerCase().includes(this.m_plainTextHead.toLowerCase())) {
            decryptedText = decryptedText.slice(this.m_plainTextHead.length);
            decryptedText = decryptedText.replace(/[\x00-\x19+/]/g, "");
        }

        return decryptedText;
    }

    private static bufferToBase64(buffer: ArrayBuffer): string {
        const uint8Array = new Uint8Array(buffer);
        return btoa(String.fromCharCode(...uint8Array));
    }

    private static base64ToBuffer(base64: string): ArrayBuffer {
        const binaryString = atob(base64);
        const length = binaryString.length;
        const buffer = new ArrayBuffer(length);
        const uint8Array = new Uint8Array(buffer);
        for (let i = 0; i < length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        return buffer;
    }
}

export { Crypt };
