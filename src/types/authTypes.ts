import { User } from "@prisma/client";

export type dataUser = Omit<User, "id">;

export function exclude<T, Key extends keyof T>(
  entity: T,
  ...keys: Key[]
): Omit<T, Key> {
  const newEntity = JSON.parse(JSON.stringify(entity));
  for (const key of keys) {
    delete newEntity[key];
  }
  return newEntity;
}

export type SignInResult = {
  email: string;
  token: string;
};
