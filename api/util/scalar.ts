import { Prisma } from "../../src/generated/client";

export const hasScalarField = function (model: Prisma.ModelName, fieldName: string) {
    let scalarFieldEnumKey = `${model}ScalarFieldEnum`
    let hasField = Prisma[scalarFieldEnumKey]?.[fieldName]
    return hasField;    
}