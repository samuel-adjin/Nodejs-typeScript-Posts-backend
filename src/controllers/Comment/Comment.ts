import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../../loggers/logger"
import { StatusCodes } from "http-status-codes";
import notFound from "../../errors//ApiError404";


const prisma = new PrismaClient();

const addComment = async (req: Request, res: Response) => {
    try {
        const { comment } = req.body;
        const { postId } = req.params;
        const content = await prisma.comment.create({
            data: {
                userId: req.user?.userId!,
                postId: parseInt(postId),
                comment
            }
        })
        res.status(StatusCodes.OK).json({ sucess: true, data: content })
    } catch (error) {
        logger.error("Error occured while adding comment", error)
    }
}

const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id, postId } = req.params;
        const isliked = await prisma.comment.count({
            where: {
                id: parseInt(id),
                userId: req.user?.userId,
                postId: parseInt(postId)
            }
        });
        if (isliked > 0) {
            await prisma.comment.delete({
                where: {
                    id: parseInt(id),
                },
            })
            return res.status(StatusCodes.OK).json({ sucess: true, msg: "comment deleted" })
        }
        throw new notFound("Failed to find comment")
    } catch (error) {
        logger.error("Error occured while deleting comment", error)
    }
}


export default { addComment, deleteComment }