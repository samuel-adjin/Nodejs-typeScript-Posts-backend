import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../../loggers/logger"
import { StatusCodes } from "http-status-codes";
import notFound from "../../errors//ApiError404";


const prisma = new PrismaClient();

const addComment = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { comment } = req.body;
        const { id:postId } = req.params;
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
        next(error)
    }
}

const deleteComment = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { id, postId } = req.params;
        //TODO:  refactor code 
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
        next(error)
    }
}

const getAPostComments = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const{id:postId} = req.params;
        const comment = await prisma.comment.findMany({
            where:{
                postId: parseInt(postId)
            }
        })
        res.status(StatusCodes.OK).json({sucess:true,data:comment})
    } catch (error) {
        logger.error("Error occured while fetching a post comments", error)
        next(error)
    }
}


export default { addComment, deleteComment,getAPostComments }