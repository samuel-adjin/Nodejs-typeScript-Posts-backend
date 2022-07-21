import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../../loggers/logger"
import { StatusCodes } from "http-status-codes";


const prisma = new PrismaClient();

const likePost = async (req: Request, res: Response, next: NextFunction) => {

    try {
        //check if user has already liked the post
        const postId = parseInt((req.query.postId as string), 10)
        const likeExist = await prisma.like.count({
            where: {
                postId: postId
            }
        })
        if (likeExist === 0) {
            const like = await prisma.like.create(
                {
                    data: {
                        userId: req.user?.userId!,
                        postId: postId
                    }
                }
            );
            return res.status(StatusCodes.OK).json({ success: true, data: like })
        }
        return res.status(StatusCodes.OK).json("Already Liked Post")


    } catch (error) {
        logger.error("error occured while liking or unliking post")
        next(error)
    }
}


const getAPostLikes = async (req: Request, res: Response) => {
    try {
        const { id: postId } = req.params;
        const likes = await prisma.like.findMany({
            where: {
                postId: parseInt(postId)
            }
        })

        res.status(StatusCodes.OK).json({ sucess: true, data: likes })
    } catch (error) {
        logger.error("Error occured while fetching a post likes", error)
    }
}


const unLikePost = async (req: Request, res: Response, next: NextFunction) => {

    try {
        //check if user has already liked the post
        const postId = parseInt((req.query.postId as string), 10)
        const likeExist = await prisma.like.findMany({
            where: {
                postId: postId,
                userId: req.user?.userId
            }
        })

        let likeId = likeExist.map(data => {
            return data["id"]
        })
        if (likeExist) {
            await prisma.like.delete({
                where: {
                    id: likeId[0]
                }
            })
            return res.status(StatusCodes.OK).json({ success: true })
        }


    } catch (error) {
        logger.error("error occured while liking or unliking post")
        next(error)
    }
}
export default { likePost, getAPostLikes, unLikePost }