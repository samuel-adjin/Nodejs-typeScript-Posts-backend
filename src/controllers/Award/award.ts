import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import logger from "../../loggers/logger"


dotenv.config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const bestEditForCurrentMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const date: Date = new Date();
        let year: number = date.getFullYear();
        let month: number = date.getMonth();
        let lastDayOfPrevMonth: string = new Date(year, month, 0).toISOString()
        let LastDayOfMonth: string = new Date(year, month + 1, 0).toISOString()
        const getCurrentmonth = await prisma.award.findMany({
            where: {
                date: {
                    gt: lastDayOfPrevMonth,
                    lte: LastDayOfMonth
                }
            }

        });
        res.status(StatusCodes.OK).json({ sucess: true, data: getCurrentmonth })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export default bestEditForCurrentMonth;