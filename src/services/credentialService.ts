import * as cryptoUtils from "../utils/cryptoUtils";
import * as credentialUtils from "../utils/credentialUtils";
import * as credentialTypes from "../types/credentialTypes";
import * as credentialRepository from "../repositories/credentialRepository";
import { notFoundError } from "../middlewares/errorMiddleware";

export async function createCredential(
  userId: number,
  credential: credentialTypes.CreateDataCredential
) {
  const credentialTitleExists = await credentialRepository.findTitleCredential(
    userId,
    credential.title
  );

  credentialUtils.verifyCredentialTitle(credentialTitleExists);

  const passwordHash = cryptoUtils.dataEncrypt(credential.password);

  await credentialRepository.createCredential(userId, {
    ...credential,
    password: passwordHash,
  });
}

export async function allCredentials(userId: number) {
  const allCredentials = await credentialRepository.allCredentials(userId);

  for (let i = 0; i < allCredentials.length; i++) {
    const e = allCredentials[i];

    e.password = cryptoUtils.dataDecrypt(e.password);
  }

  return allCredentials;
}

export async function deleteCredential(id: number) {
  return await credentialRepository.deleteCredential(id);
}

export async function getCredentialById(userId: number, id: number) {
  const credential = await credentialRepository.getCredentialById(userId, id);

  if (credential) {
    const passwordDecrypted = cryptoUtils.dataDecrypt(credential?.password);
    const credentialById = {
      ...credential,
      password: passwordDecrypted,
    };
    return credentialById;
  }

  throw notFoundError("credential");
}
