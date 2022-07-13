import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../../loggers/logger"
import { StatusCodes } from "http-status-codes";
import constant from '../../constant/constant'
import notFound from "../../errors/ApiError404"
import internalServerError from "../../errors/InternalError"

import cloudinary from "../../utils/cloudinary";

const prisma = new PrismaClient();

const fetchAllNormalUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: "USER"
            },

        });
        res.status(StatusCodes.OK).json({ success: true, data: users })
    } catch (error) {
        logger.error("Can't fetch normal Users", error)
    }

}


const fetchAllNotUser = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    role: "USER"
                }
            }
        });
        res.status(StatusCodes.OK).json({ success: true, data: users })
    } catch (error) {
        logger.error("Can't fetch non Users", error)
    }
}

const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({});
        res.status(StatusCodes.OK).json({ success: true, data: users })
    } catch (error) {
        logger.error("Can't fetch users", error)
    }
}



const findUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const User = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                email: true,
                username: true,
                id: true,
                role: true
            }
        })
        res.status(StatusCodes.OK).json({ success: true, data: User })
    } catch (error) {
        logger.error("Can't find User", error)
    }
}



const updateUserRecord = async (req: Request, res: Response) => {
    try {
        const { email, username, firstName, lastName, middleName } = req.body;
        let userDetails: Object;
        if (middleName === null || !middleName) {
            userDetails = {
                username,
                email,
                firstName,
                lastName,
            }
        } else {
            userDetails = {
                username,
                email,
                firstName,
                lastName,
                middleName,
            }
        }
        const findUser = await prisma.user.update({
            where: {
                id: req.user?.userId
            },
            data: userDetails
        });
        if (!findUser) {
            throw new notFound(constant.USER.ACTION_ERROR)
            // return res.status(200).json(constant.USER.ACTION_ERROR)
        }
        res.status(StatusCodes.OK).json({ success: true, data: findUser });
    } catch (error) {
        logger.error("Failed to Update user record", error)
    }
}

const addRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body
        const User = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                role
            },
            select: {
                email: true,
                username: true,
                id: true,
                role: true
            }
        });
        if (!User) {
            throw new notFound(constant.USER.ACTION_ERROR)
            // return res.status(200).json(constant.USER.ACTION_ERROR)
        }
        res.status(StatusCodes.OK).json({ success: true, data: User });

    } catch (error) {
        logger.error("User role not added", error)
    }
}


const lockUserAccountStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getUser = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        let lock: boolean | undefined = !getUser?.isLocked;
        const findUser = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                isLocked: lock
            },
            select: {
                email: true,
                username: true,
                id: true,
                role: true
            }
        });
        if (!findUser) {
            throw new notFound(constant.USER.ACTION_ERROR)
            // return res.status(200).json(constant.USER.ACTION_ERROR)
        }
        res.status(StatusCodes.OK).json({ success: true, data: findUser });

    } catch (error) {
        logger.error("User account can not be locked", error)
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const User = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        })
        if (!User) {
            throw new notFound(constant.USER.ACTION_ERROR)
            // return res.status(200).json(constant.USER.ACTION_ERROR)
        }
        res.status(StatusCodes.OK).json({ sucess: true })
    } catch (error) {
        logger.error("User account not deleted", error)
    }

}

const deleteManyUsers = async (req: Request, res: Response) => {
    try {

        const ids = req.body.id;
        await prisma.user.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        res.status(StatusCodes.OK).json({ sucess: true })
    } catch (error) {
        logger.error("Bulk delete failed", error)
    }
}


const searchUserByEmailOrUsername = async (req: Request, res: Response) => {
    try {
        const { email, username } = req.body;
        let search: Object = {};
        let status:boolean = true;
        if (status) {
            search = {
                where: {
                    isLocked:status
                },
                select: {
                    email: true,
                    username: true,
                    id: true,
                    role: true
                }
            }
        }else{
            search = {
                where: {
                    isLocked:!status
                },
                select: {
                    email: true,
                    username: true,
                    id: true,
                    role: true
                }
            }
        }
        if (username) {
            search = {
                where: {
                    username
                },
                select: {
                    email: true,
                    username: true,
                    id: true,
                    role: true
                }
            }
        }

        const Users = await prisma.user.findMany(search)
        res.status(StatusCodes.OK).json({ success: true, data: Users })
    } catch (error) {
        logger.error("Error occured while searching for user", error)

    }
}

const UpdateUserDescription = async (req: Request, res: Response) => {
    try {
        const { description } = req.body;
        const updateRecord = await prisma.user.update(
            {
                where: {
                    id: req.user?.userId
                },
                data: {
                    description
                }
            }
        )
        res.status(StatusCodes.OK).json({ success: true, data: updateRecord })
    } catch (error) {
        logger.error("Error updating description", error)
    }
}

const updateProfileImage = async (req: Request, res: Response) => {
    try {
        //before a user can change dp check if they have a previous dp if yes grab the id and delete the old one before updating 

        const { image } = req.body
        const hasProfile = await prisma.user.findUnique({
            where: {
                id: req.user?.userId
            }
        });
        //if user does not have a profile pic
        if (hasProfile?.profile === null) {
            const updateProfilePic = await updateProfile(image, req)
            return res.status(StatusCodes.OK).json({ success: true, data: updateProfilePic })
        }
        // delete old profile in cloudinary before changing to new one
        const deleteOldPic = await deleteCloudinaryImage(req);
        if (deleteOldPic) {
            const updateProfilePic = await updateProfile(image, req)
            return res.status(StatusCodes.OK).json({ success: true, data: updateProfilePic })
        }


    } catch (error) {
        logger.error("Error updating profile pic", error)
    }
}

const deleteProfile = async (req: Request, res: Response) => {
    try {
        const profilePic = await deleteCloudinaryImage(req);
        if (!profilePic) {
            throw new internalServerError("cloudinary Image failed to delete");
        }
        //update profile to null
        const deleteImage = await prisma.user.update({
            where: {
                id: req.user?.userId
            },
            data: {
                profile: null
            }
        })
        return res.status(StatusCodes.OK).json({ success: true, data: deleteImage })

    } catch (error) {
        logger.error("failed to delete user profile pic", error)
    }
}


const updateProfile = async (image: string, req: Request) => {
    const profile = await cloudinary.uploader.upload(image, {
        folder: "profile-pic"
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



const deleteCloudinaryImage = async (req: Request) => {
    const getUser = await prisma.user.findUnique({
        where: {
            id: req.user?.userId
        }
    })
    const deleteOldPic = await cloudinary.uploader.destroy(getUser?.profile!, { resource_type: "image" }, (result, error) => {
        console.log(result, error)
    })

    return deleteOldPic;
}

export default {
    fetchAllNormalUsers,
    fetchAllNotUser,
    fetchAllUsers,
    findUser,
    addRole,
    updateUserRecord,
    lockUserAccountStatus,
    deleteUser,
    deleteManyUsers,
    UpdateUserDescription,
    updateProfileImage,
    searchUserByEmailOrUsername,
    deleteProfile
};


