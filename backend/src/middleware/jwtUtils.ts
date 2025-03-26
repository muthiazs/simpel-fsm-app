import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

//INISIASI SECRET KEY
const SECRET_KEY = "mysecretkey";

export const createToken = (payload: object) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token berlaku 1 jam
  };

  export const verifyToken = (token: string): JwtPayload & { id: number } | null => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        // Pastikan decoded adalah objek dan memiliki id
        if (typeof decoded === 'string' || !decoded || !('id' in decoded)) {
            return null;
        }

        return decoded as JwtPayload & { id: number };
    } catch (error) {
        return null;
    }
  };

  const blacklistedTokens = new Set<string>(); // Gunakan Set agar pencarian lebih cepat

export const addToBlacklist = (token: string) => {
    blacklistedTokens.add(token);
};

export const isTokenBlacklisted = (token: string): boolean => {
    return blacklistedTokens.has(token);
};
