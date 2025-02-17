import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}
