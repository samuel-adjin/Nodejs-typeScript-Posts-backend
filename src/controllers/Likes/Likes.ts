import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../../loggers/logger"
import { StatusCodes } from "http-status-codes";


const prisma = new PrismaClient();

const likeOrUnlikePost = async (req: Request, res: Response) => {
    try {
        //check if user records exists on the like table if yes then delete wen user clicks like 
        const { id: postId, likeId } = req.params;
        //refactor make it middleware
        const isliked = await prisma.like.count({
            where: {
                userId: req.user?.userId,
                postId: parseInt(postId)
            }
        });
        if (isliked > 0) {
            await prisma.like.delete({
                where: {
                    id: parseInt(likeId)
                }
            });
            return res.status(StatusCodes.OK).json({ sucess: true, msg: "post unliked" })
        }
        const like = await prisma.like.create(
            {
                data: {
                    userId: req.user?.userId!,
                    postId: parseInt(postId)
                }
            }
        );
        return res.status(StatusCodes.OK).json({ success: true, data: like })

    } catch (error) {
        logger.error("error occured while liking or unliking post")
    }
}


export default { likeOrUnlikePost }