import { Request, Response } from "express";
import { Iuser, User } from "../model/User";
import { hash, genSalt, compare } from "bcrypt";
import CreateUserToken from "../../../middleware/CreateUserToken";
import getToken from "../../../middleware/getToken";
import getUserByToken from "../../../middleware/getUserByToken";

export default class AuthenticationController {
    static async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            if (!name) {
                return res.status(400).json({ message: "Name required" });
            }

            if (!email) {
                return res.status(400).json({ message: "Email required" });
            }

            if (!password) {
                return res.status(400).json({ message: "Password required" });
            }

            const emailExist = await User.findUnique({ where: { email } });

            if (emailExist) {
                return res.status(409).json({ message: "Email exists" });
            }

            if (!req.file) {
                return res.status(400).json({ message: "Photo required" });
            }

            const salt = await genSalt(10);
            const passwordHash = await hash(password, salt);

            await User.create({
                data: {
                    email,
                    name,
                    password: passwordHash,
                    photo: req.file.filename,
                },
            });

            return res.status(201).json({ message: "User created successfully" });
        } catch (err) {
            console.error(err); // Log o erro para debug
            return res.status(500).json({ message: "Internal system error" });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email required" });
            }

            if (!password) {
                return res.status(400).json({ message: "Password required" });
            }

            const emailExist = await User.findUnique({ where: { email } });

            if (!emailExist) {
                return res.status(404).json({ message: "Email not found" });
            }

            const passwordIsValid = await compare(password, emailExist.password);

            if (!passwordIsValid) {
                return res.status(409).json({ message: "Password is wrong" });
            }

            // Chame a função para criar o token
            CreateUserToken(emailExist, req, res);
        } catch (err) {
            console.error(err); // Log o erro para debug
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async myUser(req: Request, res: Response) {
        try {
            const token = getToken(req);
            const user = await getUserByToken(token, res);

            if (!user) {
                return res.status(404).json({ user: {} });
            }

            return res.status(200).json(user);
        } catch (err) {
            console.error(err); // Log o erro para debug
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body;

            const token = getToken(req);
            const user = await getUserByToken(token, res) as Iuser;

            if (email) user.email = email;

            if (name) user.name = name;

            if (password) {
                const salt = await genSalt(12);
                const hashPassword = await hash(password, salt);

                user.password = hashPassword;
            }

            if (req.file) {
                user.photo = req.file.filename;
            }

            await User.update({ where: { id: user.id }, data: user });

            return res.status(200).json({ message: "User updated successfully" });
        } catch (err) {
            console.error(err); // Log o erro para debug
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const token = getToken(req);
            const user = await getUserByToken(token, res) as Iuser;
            
            await User.delete({ where: { id: user.id } });

            return res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            console.error(err); // Log o erro para debug
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
