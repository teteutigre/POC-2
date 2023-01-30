import { Credential } from "@prisma/client";

export type dataCredential = Omit<Credential, "id" | "createdAt">;

export type CreateDataCredential = Omit<Credential, "id" | "userId">;
