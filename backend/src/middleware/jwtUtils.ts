import jwt from 'jsonwebtoken';

//INISIASI SECRET KEY
const SECRET_KEY = "mysecretkey";

export const createToken = (payload: object) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token berlaku 1 jam
  };

  export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return null;
    }
  };