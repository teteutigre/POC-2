import { prisma } from "../config/database";
import * as authService from "../types/authTypes";

export async function findEmailById(id: number) {
  const result = await prisma.user.findUnique({ where: { id } });

  return result;
}

export async function findEmail(email: string) {
  const result = await prisma.user.findUnique({ where: { email } });

  return result;
}

export async function createUser(user?: authService.dataUser) {
  await prisma.user.create({ data: user });
}
