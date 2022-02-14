import { PrismaClient } from "../../../../src/generated/client";

export default function requestLatencyCheck(prisma: PrismaClient) {
    console.log("INIT MIDDLEWARE 'requestLatencyCheck'")
    prisma.$use(async (params, next) => {
        const before = Date.now()

        const result = await next(params)

        const after = Date.now()

        console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)

        return result
    })
}