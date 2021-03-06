// get the user with the most post in a particular month
// get all users and their number of posts
//fetch all post for a month and pluck all the ids 
// compare re-construct an array. chck ids against post 
// maintain a counter to track number of user posts as you loop

import { PrismaClient } from "@prisma/client";
import queue from "../jobs/baseQueue"
const prisma = new PrismaClient();

const highPost = async () => {
    try {

        let date: Date = new Date();
        let year: number = date.getFullYear();
        let month: number = date.getMonth();
        let firstDayOfMonth: Date = new Date(year, month - 1, 1)
        let LastDayOfMonth: Date = new Date(year, month, 0)
        let dummyfirst = new Date(year, 6, 1)
        let dummylast = new Date(year, 7, 0)


        const PostWithinRange = await prisma.post.findMany({
            where: {
                updated_at: {
                    // gte:LastDayOfMonth,
                    // lte:LastDayOfMonth
                    gte: dummyfirst,
                    lte: dummylast
                },
                isPublished: true
            }
        })
        const userIds = PostWithinRange.map(d => d.userId);
        let count: Object = {};
        userIds.forEach(user => {
            if (count[user]) {
                count[user]++
            } else {
                count[user] = 1;
            }
        })
        let valuesArray: number[] = Object.values(count);
        let max: number = Math.max(...valuesArray)
        let userId: string[] = Object.keys(count).filter(d => count[d] === max);
        let intUserId: number[] = userId.map(d => parseInt(d, 10))
        const awardee = await prisma.user.findMany({
            where: {
                id: {
                    in: intUserId
                }
            },
            select: {
                id: true
            }
        })


        const finalData = awardee.map(d => {
            return {
                "userId": d.id,
                "date": `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            }

        })


    } catch (error) {
        console.log(error)
    }
}

type awardees = {
    userId: number,
    date: string
};

const awardee = async (data: awardees[]): Promise<void> => {
    try {
        await prisma.award.createMany({
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}


export default { awardee, highPost }
