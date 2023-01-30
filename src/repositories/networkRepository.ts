import { prisma } from "../config/database";
import * as networkTypes from "../types/networkTypes";

export async function createNetwork(
  userId: number,
  network: networkTypes.CreateDataNetwork
) {
  const networkDate = {
    userId,
    ...network,
  };

  await prisma.network.create({ data: networkDate });
}

export async function allNetwork(userId: number) {
  return await prisma.network.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      network: true,
      password: true,
    },
  });
}

export async function deleteNetwork(id: number) {
  return await prisma.network.delete({ where: { id } });
}

export async function getNetworkById(userId: number, id: number) {
  return await prisma.network.findFirst({
    where: { userId, id },
    select: {
      id: true,
      title: true,
      network: true,
      password: true,
    },
  });
}
