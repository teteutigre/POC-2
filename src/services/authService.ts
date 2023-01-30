import * as authTypes from "../types/authTypes";
import * as authRepository from "../repositories/authRepository";
import * as cryptoUtils from "../utils/cryptoUtils";
import * as authUtils from "../utils/authUtils";

export async function findEmailById(id: number) {
  const user = await authRepository.findEmailById(id);

  return user;
}

export async function signUp(userData: authTypes.dataUser) {
  const emailExists = await authRepository.findEmail(userData.email);

  authUtils.EmailExists(emailExists);

  const passwordHash = await cryptoUtils.passwordEncrypt(userData.password);

  return await authRepository.createUser({
    email: userData.email,
    password: passwordHash,
  });
}

export async function signIn(
  userData: authTypes.dataUser
): Promise<authTypes.SignInResult> {
  const emailExists = await authRepository.findEmail(userData.email);

  authUtils.EmailNotExists(emailExists);

  if (emailExists?.password) {
    cryptoUtils.checkPassword(userData.password, emailExists.password);
    const token = authUtils.generateToken(emailExists);
    return { email: userData.email, token: token };
  }
}
