import { Prisma, PrismaClient } from "../../../../src/generated/client";
import { hasScalarField } from "../../../util/scalar";

export default function softDelete_read_update_prevent(prisma: PrismaClient) {
    console.log("INIT MIDDLEWARE 'softDelete_read_update_prevent'")
    useFindMiddleware(prisma, "User")
}

const useFindMiddleware = (prisma: PrismaClient, model: Prisma.ModelName, callback?: ((params: Prisma.MiddlewareParams) => Promise<void>) | undefined) => {
    if (hasScalarField(model, "isDeleted"))
        prisma.$use(createFindMiddleware(prisma, model, callback))
}

const createFindMiddleware = (prisma: PrismaClient, model: Prisma.ModelName, callback?: ((params: Prisma.MiddlewareParams) => Promise<void>) | undefined): Prisma.Middleware => {
    return async (params, next) => {
        let executeCallback = false
        if (params.model === model) {
            if (params.action === "findUnique") {
                params.action = "findFirst"
                params.args.where["isDeleted"] = false
                executeCallback = true
            }
            if (params.action === "findMany") {
                if (params.args.where !== undefined) {
                    if (params.args.where.isDeleted === undefined) {
                        params.args.where["isDeleted"] = false
                    }
                } else {
                    params.args["where"] = { isDeleted: false }
                }
                executeCallback = true
            }
        }

        const result = await next(params)

        if (executeCallback)
            await callback?.(params)

        return result
    }
}