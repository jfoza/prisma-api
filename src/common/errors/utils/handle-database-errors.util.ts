import { PrismaClientError } from '../types/prisma-client-error';
import { UniqueConstraintError } from '../types/unique-constraint-error';
import { DatabaseError } from '../types/database-error';

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e.message);
  }
};
