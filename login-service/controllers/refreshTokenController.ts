import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: number;
}

const prisma = new PrismaClient();

export const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const user = await prisma.user.findUnique({ where: { refreshToken } });
    if (!user) return res.sendStatus(403);

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string) as JwtPayload;

        if (decoded.userId !== user.id) return res.sendStatus(403);

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_SECRET as string,
            { expiresIn: '30s' }
        );

        console.log(accessToken);
        res.json({ accessToken });
    } catch (err) {
        return res.sendStatus(403);
    }
};