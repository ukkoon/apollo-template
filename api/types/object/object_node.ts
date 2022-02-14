import { Date } from "graphql-scalars/typeDefs";
import { interfaceType, nonNull } from "nexus";

export const ObjectNode = interfaceType({
    name: "ObjectNode",
    definition(t) {
        t.nonNull.string("id")
        t.nonNull.string("createdAt")
        t.nonNull.string("updatedAt")
    }
})

