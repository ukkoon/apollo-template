import { Context } from '../interface/context';
import prisma from './prisma/prisma';

export function createContext(ctx?: any,): Context {
    return {
        prisma: prisma,
        request: ctx.req
    }
}

// export function createContext(ctx?: any,): Context {
//     return {
//         prisma: prisma,
//         gcpStorage: gcpStorage,
//         gcpTask: gcpTask,
//         slack: slack,
//         popbill: popbill,
//         fcm: fcm,
//         remoteConfig: remoteConfig,
//         request: ctx.req
//     }
// }
