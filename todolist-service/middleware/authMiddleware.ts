import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  userId: string;
}

export function authToken(req : Request, res : Response, next : NextFunction) {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_SECRET as string, (err, decoded) => {
        if (err) return res.sendStatus(401); //invalid token

            const payload = decoded as JwtPayload;

            (req as any).userId = payload.userId; //forward the data
            //console.log(payload.userId)
            next();
    });
}