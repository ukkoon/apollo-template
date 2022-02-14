import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { createContext } from "./context/create_context";
import schema from "./schema";
require("dotenv").config();

const PRODUCTION = process.env.NODE_ENV === "production"
const PORT = PRODUCTION ? process.env.PRODUCTION_PORT : process.env.DEVELOPMENT_PORT;

async function initApolloServer() {
    const expressApp = express();
    const httpServer = createServer(expressApp);

    let apolloServer = new ApolloServer({
        introspection: !PRODUCTION,
        schema: schema,
        context: createContext,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer })
        ]
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({
        app: expressApp,
        path: "/",
        cors: {
            origin: "*",
            credentials: true
        }
    })

    await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
}

initApolloServer()