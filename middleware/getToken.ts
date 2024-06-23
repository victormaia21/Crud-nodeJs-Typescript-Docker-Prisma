import { Request } from "express";

function getToken(req:Request) {
    const tokenBearer : string | undefined = req.headers.authorization;
    const token : string | undefined = tokenBearer?.split(' ')[1];
    return token;
}

export default getToken;