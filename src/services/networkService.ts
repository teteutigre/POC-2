import { notFoundError } from "../middlewares/errorMiddleware";
import * as networkRepository from "../repositories/networkRepository";
import * as networkTypes from "../types/networkTypes";
import * as cryptoUtils from "../utils/cryptoUtils";
import * as networkUtils from "../utils/networkUtils";

export async function createNetwork(
  userId: number,
  network: networkTypes.CreateDataNetwork
) {
  const hashedPassword = cryptoUtils.dataEncrypt(network.password);

  return await networkRepository.createNetwork(userId, {
    ...network,
    password: hashedPassword,
  });
}

export async function allNetwork(userId: number) {
  const allNetwork = await networkRepository.allNetwork(userId);

  return allNetwork;
}

export async function getNetworkById(userId: number, id: number) {
  const network = await networkRepository.getNetworkById(userId, id);

  networkUtils.networkExists(network);

  if (network) {
    const passwordDecrypted = cryptoUtils.dataDecrypt(network?.password);
    const networkById = {
      ...network,
      password: passwordDecrypted,
    };
    return networkById;
  }
}

export async function deleteNetwork(id: number) {
  return await networkRepository.deleteNetwork(id);
}
