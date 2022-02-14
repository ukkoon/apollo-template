import { PrismaClient } from "../../src/generated/client";


export interface Context {
    prisma: PrismaClient,    
    request: { headers: { authorization?: string } }
}