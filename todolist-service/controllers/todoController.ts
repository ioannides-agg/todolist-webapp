import { Request, Response } from 'express';
import { Todo } from '../types/todo';

import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const retrieve = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    if (!userId) return res.sendStatus(401);

    const allTodos = await prisma.todo.findMany({
        where: {
            owner: userId,
        }, orderBy: {
            completed: 'asc'
        }
    })

    if(!allTodos) return res.sendStatus(500);

    const typedTodos = allTodos as Todo[]
    return res.status(200).json(typedTodos);
}

export const add = async (req : Request, res: Response) => {
    const userId = (req as any).userId;
    const {title} = req.body;

    if (!userId) return res.sendStatus(401);
    if (!title) return res.sendStatus(422);

    const added = await prisma.todo.create({
        data: { owner: userId, title: title}
    });

    if (!added) return res.status(422);
 
    return res.status(201).json(added as Todo);
};