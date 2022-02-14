import { objectType } from "nexus";
import { ObjectNode } from "./object_node";

export const User = objectType({
    name:"User",
    definition(t){
        t.implements(ObjectNode)
    }
})