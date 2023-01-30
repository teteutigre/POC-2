import { unauthorizedError } from "../middlewares/errorMiddleware";
import bcrypt from "bcrypt";
import Cryptr from "cryptr";

const cryptr = new Cryptr(String(process.env.CRYPTR_SECRET_KEY));

export async function passwordEncrypt(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
}

export function checkPassword(password: string, hashedPassword: string) {
  if (!bcrypt.compareSync(password, hashedPassword))
    throw unauthorizedError("Email or password");
}

export function dataEncrypt(data: string) {
  const StringEncrypted = cryptr.encrypt(data);
  return StringEncrypted;
}

export function dataDecrypt(StringEncrypted: string) {
  const stringDecrypted = cryptr.decrypt(StringEncrypted);
  return stringDecrypted;
}
