import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | undefined;

export const db = prisma || new PrismaClient();

// @ts-ignore
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;