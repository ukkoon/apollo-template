import { PrismaClient } from "../../../src/generated/client"
import deleted_record_blocker from "./middleware/deleted_record_blocker"
import requestLatencyCheck from "./middleware/latency_checker"
import softDelete from "./middleware/soft_delete"
require("dotenv").config()

const prisma = new PrismaClient()

softDelete(prisma)
deleted_record_blocker(prisma)
requestLatencyCheck(prisma)

export default prisma;
