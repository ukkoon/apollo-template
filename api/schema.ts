import { makeSchema, fieldAuthorizePlugin } from "nexus";
import * as path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { toError } from "./util/error";
require('dotenv').config()

const PRISMA_CLIENT_PATH = `${__dirname.replace(/\/api$/, "/").replace(/\/dist$/, "/")}/src/generated/client/index.d.ts`

export default makeSchema({
    features: {
        abstractTypeStrategies: {
            resolveType: false
        }
    },
    types: loadFilesSync([
        path.join(__dirname, "/types/**/*.ts"),
        path.join(__dirname, "/types/**/*.js"),
    ]),
    plugins: [
        fieldAuthorizePlugin({
            formatError: () =>
                toError({
                    key: "errors.notAuthorized",
                })
        }),
    ],
    outputs: {
        schema: path.join(__dirname, ".", "schema.graphql"),
    },
    sourceTypes: {
        debug: process.env.NODE_ENV !== "production",
        modules: [
            {
                module: PRISMA_CLIENT_PATH,
                alias: "prisma",
            },
        ],
    },
    contextType: {
        module: process.env.NODE_ENV !== "production"
            ? `${__dirname}/interfaces/context.ts`
            : `${__dirname}/interfaces/context.js`,
        export: "Context",
    },
});
