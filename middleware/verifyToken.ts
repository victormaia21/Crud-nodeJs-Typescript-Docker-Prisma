import getToken from "./getToken";
import { NextFunction, Request, Response } from 'express';

function verifyToken(req:Request,res:Response,next:NextFunction) {
    if(!req.headers.authorization) {
        return res.status(422).json({message:"TOKEN INVALIDO"});
    }
    const token = getToken(req);
    if(!token) {
        return res.status(422).json({message:"TOKEN INVALIDO"});
    }

    next();
    
}

export default verifyToken;