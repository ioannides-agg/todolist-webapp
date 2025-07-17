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

    if (!added) return res.sendStatus(500);
 
    return res.status(201).json(added as Todo);
};

export const updateCompleteness = async (req : Request, res: Response) => {
    const userId = (req as any).userId;
    const {todoId, state} = req.body.payload;

    if (!userId) return res.sendStatus(401);
    if (typeof state !== 'boolean' || typeof todoId !== 'number') return res.sendStatus(422);

    const updated = await prisma.todo.update({
        where: {
            id: todoId,
            owner: userId
        }, data : {
            completed: state
        }
    })

    if (!updated) return res.sendStatus(404);
 
    return res.sendStatus(204);
};

export const deleteOne = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const todoId = req.body.id;

    if(!userId) return res.status(401);
    if(typeof todoId !== 'number') return res.sendStatus(422);

    const deleted = await prisma.todo.delete({
        where: {
            id: todoId,
            owner: userId
        }
    })

    if (!deleted) return res.sendStatus(404);

    return res.sendStatus(204);
}

export const deleteMany = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    if(!userId) return res.status(401);

    const deleted = await prisma.todo.deleteMany({
        where: {
            owner: userId,
            completed: true
        }
    })

    if (deleted.count === 0) return res.sendStatus(404);

    return res.sendStatus(204);
}