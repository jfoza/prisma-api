import { PrismaClientKnownRequestError } from 'prisma/prisma-client/runtime/library';

export type PrismaClientError = PrismaClientKnownRequestError & {
  meta?: { target: string };
};
