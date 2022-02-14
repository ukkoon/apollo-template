import { Prisma, PrismaClient } from "../../../../src/generated/client";
import { hasScalarField } from "../../../util/scalar";
import { v4 as uuid } from 'uuid'

export default function softDelete(prisma: PrismaClient) {
    console.log("INIT MIDDLEWARE 'softDelete'")
    useDeleteMiddleware(prisma, "User", async (params: Prisma.MiddlewareParams, result) => {
        if (params.model === "User") {
            await prisma.user.update({
                where: { id: result.id },
                data: {
                    email: `${result.email}/${uuid()}`
                }
            })
        }
    })
}

const useDeleteMiddleware = (prisma: PrismaClient, model: Prisma.ModelName, callback?: ((params: Prisma.MiddlewareParams, result) => Promise<void>) | undefined) => {
    if (hasScalarField(model, "isDeleted"))
        prisma.$use(createDeleteMiddleware(prisma, model, callback))
}

const createDeleteMiddleware = (prisma: PrismaClient, model: Prisma.ModelName, callback?: ((params: Prisma.MiddlewareParams, result) => Promise<void>) | undefined): Prisma.Middleware => {
    return async (params, next) => {
        let executeCallback = false
        if (params.model === model) {
            if (params.action === "delete") {
                params.action = "update"
                params.args["data"] = { isDeleted: true }

                executeCallback = true
            }
            if (params.action === "deleteMany") {
                params.action = "updateMany"
                if (params.args.data !== undefined) {
                    params.args.data["isDeleted"] = true
                } else {
                    params.args["data"] = { isDeleted: true }
                }
                executeCallback = true
            }
        }

        const result = await next(params)

        if (executeCallback)
            await callback?.(params, result)

        return result
    }
}