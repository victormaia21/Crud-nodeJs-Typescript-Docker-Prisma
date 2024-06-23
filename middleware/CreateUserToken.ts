import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Iuser } from '../api/v1/model/User';

function CreateUserToken(usuario : Iuser ,req:Request,res:Response) {
    const token : string = jwt.sign({
        id:usuario.id
    },`${process.env.TOKEN_SECRET}`);


    res.status(200).json({
        message:"Usuario autenticado com sucesso",
        token:token,
        id:usuario.id
    });
}

export default CreateUserToken;