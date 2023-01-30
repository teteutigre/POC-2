import * as networkTypes from "../types/networkTypes";
import { Network } from "@prisma/client";
import { conflictError, notFoundError } from "../middlewares/errorMiddleware";

export function networkTitleExists(networkTitleExists: Network | null) {
  if (networkTitleExists) throw conflictError("This title");
}

export function networkExists(networkExists: networkTypes.dataNetwork | null) {
  if (!networkExists) throw notFoundError("Network");
}
