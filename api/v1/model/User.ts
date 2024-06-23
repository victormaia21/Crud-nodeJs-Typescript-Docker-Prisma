import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Iuser {
    id: string;
    name: string;
    email: string;
    password: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;
}

const User = prisma.user;

export { User, Iuser };