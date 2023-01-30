import { Network } from "@prisma/client";

export type dataNetwork = Omit<Network, "userId">;

export type CreateDataNetwork = Omit<Network, "id" | "userId">;
