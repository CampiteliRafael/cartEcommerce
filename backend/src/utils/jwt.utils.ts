import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signJwt(payload: object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(payload, JWT_SECRET, {...options && options});
};

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) { return {
        valid: false,
        expired: e.message === 'jwt expired',
        decoded: null,
    }; }
};