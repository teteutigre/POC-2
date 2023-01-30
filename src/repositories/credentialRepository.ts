import { prisma } from "../config/database";
import * as credentialTypes from "../types/credentialTypes";

export async function createCredential(
  userId: number,
  credential: credentialTypes.CreateDataCredential
) {
  const credentialInfo = {
    userId,
    ...credential,
  };

  return await prisma.credential.create({ data: credentialInfo });
}

export async function findTitleCredential(userId: number, title: string) {
  return await prisma.credential.findFirst({
    where: { userId, title },
  });
}

export async function allCredentials(userId: number) {
  return await prisma.credential.findMany({
    where: { userId },
    select: {
      id: true,
      url: true,
      title: true,
      username: true,
      password: true,
    },
  });
}

export async function deleteCredential(id: number) {
  return await prisma.credential.delete({ where: { id } });
}

export async function getCredentialById(userId: number, id: number) {
  return await prisma.credential.findFirst({
    where: { userId, id },
    select: {
      id: true,
      url: true,
      title: true,
      username: true,
      password: true,
    },
  });
}
