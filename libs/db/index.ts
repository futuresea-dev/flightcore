import { Prisma, PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

export default Prisma;
