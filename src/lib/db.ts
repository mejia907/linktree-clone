import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  return new PrismaClient();
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = createPrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = createPrismaClient();
    
    process.on('beforeExit', async () => {
      if (globalThis.prisma) {
        await globalThis.prisma.$disconnect();
      }
    });
  }
  prisma = globalThis.prisma;
}

if (process.env.NODE_ENV !== 'production' && !globalThis.prisma) {
  globalThis.prisma = prisma;
}

export const db = prisma;