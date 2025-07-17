import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email: email, password: hashed, refreshToken: "" }
    });

    res.json({ message: "User created", user: { id: user.id, email: user.email } });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid Credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid Credentials" });

    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_SECRET as string, { expiresIn: '30s' });

    let refreshToken: string;

    if (user.refreshToken) {
        refreshToken = user.refreshToken;
    } else {
        refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET as string, { expiresIn: '1d' });
        const storeRefreshToken = await prisma.user.update({
            where: { id: user.id },
            data: {
                refreshToken: refreshToken,
            }
        });

        if (!storeRefreshToken) return res.sendStatus(500);
    }

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
};

export const logout = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const foundUser = await prisma.user.findUnique({ where: { refreshToken: refreshToken } });

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.sendStatus(204);
    }

    await prisma.user.update({
        where: {
            refreshToken: refreshToken,
        },
        data: {
            refreshToken: '',
        }
    });

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(204);
};

export const validate = async (req: Request, res: Response) => {
    const userId = (req as any).userId; // type-safe solution is below

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            email: true,
        }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
};