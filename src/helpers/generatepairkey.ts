import crypto from "crypto";
export const generatePairKey = () => {
    const publicKey = crypto.randomBytes(256).toString("base64");
    const privateKey = crypto.randomBytes(256).toString("base64");
    return {publicKey,privateKey}
}