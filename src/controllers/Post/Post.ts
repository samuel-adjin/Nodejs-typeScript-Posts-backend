import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../../loggers/logger"
import { StatusCodes } from "http-status-codes";
import internalServerError from "../../errors/InternalError"

import cloudinary from "../../utils/cloudinary";

const prisma = new PrismaClient();

const fetchAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({});
        res.status(StatusCodes.OK).json({ success: true, data: posts });
    } catch (error) {
        logger.error("Failed to fetch all posts", error)
    }
}

const getAPost = async (req: Request, res: Response) => {
    try {
        const { id: postId } = req.body
        const post = prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            }
        });
        res.status(StatusCodes.OK).json({ success: true, data: post });
    } catch (error) {
        logger.error("Failed to fetch a post", error)
    }
}

const fetchAllPublishedPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                isPublished: true
            }
        });
        res.status(StatusCodes.OK).json({ success: true, data: posts });
    } catch (error) {
        logger.error("Failed to fetch all posts", error)
    }
}

const fetchAllunPublishedPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                isPublished: false
            }
        });
        res.status(StatusCodes.OK).json({ success: true, data: posts });
    } catch (error) {
        logger.error("Failed to fetch all posts", error)
    }
}

const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, image } = req.body;
        const picture = await cloudinary.uploader.upload(image, {
            folder: "posts"
        })

        const post = await prisma.post.create({
            data: {
                title,
                content,
                picture: picture.public_id,
                userId: req.user?.userId!
            }
        })
        res.status(StatusCodes.CREATED).json({ success: true, data: post });
    } catch (error) {
        logger.error("Failed to create post", error)
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const { id: postId } = req.params;
        const { title, content } = req.body;
        const post = await prisma.post.update({
            where: {
                id: parseInt(postId)
            },
            data: {
                title,
                content
            }
        })
        res.status(StatusCodes.CREATED).json({ success: true, data: post });
    } catch (error) {
        logger.error("Failed to update post", error)
    }
}

const changeImage = async (req: Request, res: Response) => {
    try {
        const { image } = req.body;
        const { id: postId } = req.params;
        let isCloudDeleted = await deleteCloudinaryImage(req, postId);
        if (!isCloudDeleted) {
            throw new internalServerError("Failed to deleted from cloudinary")
        }
        const changedPic = await updatePicture(image, req)
        res.status(StatusCodes.OK).json({ success: true, data: changedPic });
    } catch (error) {
        logger.error("Changing Image failed", error)
    }
}

const publishOrUnpublishPost = async (req: Request, res: Response) => {
    try {
        const { id: postId } = req.body;
        const getPost = await prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            }
        })

        let isPublished: boolean = !getPost?.isPublished
        const post = await prisma.post.update({
            where: {
                id: parseInt(postId)
            },
            data: {
                isPublished
            }
        })
        res.status(StatusCodes.OK).json({ success: true, data: post });

    } catch (error) {
        logger.error("Changing Image failed", error)
    }
}


const fetchAllPostPaginated = async (req: Request, res: Response){
    try {
        const perPage = parseInt((req.query.limit as string), 10) || 2;
        const cursor = req.query.cursor as string || undefined;

        let data: any[];
        // Cursor tells the query where it should start from when taking data. A unique point.
        if (cursor) {
            data = await prisma.post.findMany({
                where: {
                    isPublished: true
                },
                take: perPage,
                skip: 1,
                cursor: { id: parseInt(cursor) },
            });
        } else {
            data = await prisma.post.findMany({
                take: perPage,
                where: {
                    isPublished: true
                },
            });
        }

        if (data.length > 0) {
            // Get last value in query
            const lastResult = data[data.length - 1];
            // Set the new cursor as id of last result so our next query will know where to begin
            const myCursor = lastResult.id;
            // Check if from the last query we have extra data so
            // we make frontend aware if it can request for more
            const secondResult = await prisma.post.findMany({
                take: perPage,
                cursor: { id: myCursor },
                where: {
                    isPublished: true
                },
                select: { id: true },
            });
            const result = {
                pageInfo: { endCursor: myCursor, hasNextPage: secondResult.length >= perPage },
                edges: data.map((d) => ({ cursor: d.id, node: d })),
            };
            return res.status(StatusCodes.OK).json({ users: result });
        }

        return res.status(StatusCodes.OK).json({
            users: {
                pageInfo: { endCursor: null, hasNextPage: false },
                edges: [],
            },
        });
    } catch (error) {
        logger.error("Failed to fetch paginated all posts", error)
    }
}


const deleteCloudinaryImage = async (req: Request, postId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(postId)
        }
    })
    const deleteOldPic = await cloudinary.uploader.destroy(post?.picture!, { resource_type: "image" }, (result, error) => {
        console.log(result, error)
    })

    return deleteOldPic;
}

const updatePicture = async (image: string, req: Request) => {
    const profile = await cloudinary.uploader.upload(image, {
        folder: "posts"
    })

    const updateProfilePic = await prisma.user.update({
        where: {
            id: req.user?.userId
        },
        data: {
            profile: profile.public_id
        }
    })

    return updateProfilePic;
}

export default
    {
        createPost,
        fetchAllPosts,
        getAPost,
        fetchAllPublishedPosts,
        fetchAllunPublishedPosts,
        updatePost,
        changeImage,
        publishOrUnpublishPost
    }