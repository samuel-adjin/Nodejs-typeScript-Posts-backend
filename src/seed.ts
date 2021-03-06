import { Prisma, PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import bcrypt from "bcrypt"
import logger from "./loggers/logger"

dotenv.config();
const prisma = new PrismaClient();
const seedAdmin = async () => {
    try {
        const admin_email = await prisma.user.findFirst({
            where: {
                email: process.env.SUPER_ADMIN_EMAIL
            }
        });
        if (admin_email) {
            return null;
        }
       
        const password = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD!,10);
        let AdminDetails:Prisma.UserCreateInput =
        {
            email: process.env.SUPER_ADMIN_EMAIL!,
            username: process.env.SUPER_ADMIN_USERNAME!,
            password: password,
            role: "ADMIN",
            isVerfiied: true,
            firstName: "Admin",
            lastName:"Admin",
            mobile:"0573095386"
        }
        await prisma.user.create({
            data: AdminDetails
        });
        console.log(process.env.SUPER_ADMIN_PASSWORD +" "+ process.env.SUPER_ADMIN_USERNAME + " " +  process.env.SUPER_ADMIN_EMAIL)
    } catch (error) {
        logger.error("Admin seeding failed", error)
    }
}

seedAdmin()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })