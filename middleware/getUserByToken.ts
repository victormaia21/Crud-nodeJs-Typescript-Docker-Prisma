import jwt from 'jsonwebtoken';
import { User } from '../api/v1/model/User';
import { Response } from 'express';

interface UserId {
    id: string;
}

async function getUserByToken(token: string | undefined, res: Response) {
    try {
        if (!token) {
            res.status(404).json({ message: "Token not found" });
            return undefined;
        }

        const jwtVerify = jwt.verify(token, `${process.env.TOKEN_SECRET}`) as UserId;

        if (!jwtVerify.id) {
            res.status(409).json({ message: "Unauthorized" });
            return undefined;
        }

        const { id } = jwtVerify;

        if (!id) {
            res.status(409).json({ message: "Unauthorized" });
            return undefined;
        }

        const user = await User.findUnique({
            where: { id },
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        return user;
    } catch (error) {
        console.error("Error in getUserByToken:", error);
        res.status(500).json({ message: "Internal server error" });
        return undefined;
    }
}

export default getUserByToken;
