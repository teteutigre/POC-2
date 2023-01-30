import { conflictError } from "../middlewares/errorMiddleware";
import { Credential } from "@prisma/client";

export function verifyCredentialTitle(
  credentialTitleExists: Credential | null | undefined
) {
  if (credentialTitleExists) throw conflictError("This credential title");
}
