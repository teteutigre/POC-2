import { Router } from "express";
import { validateSchema } from "../middlewares/validations/schemaValidator";
import { validateToken } from "../middlewares/validations/tokenValidator";
import * as credentialsController from "../controllers/credentialController";
import { createCredentialSchema } from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post(
  "/credential/create",
  validateToken,
  validateSchema(createCredentialSchema),
  credentialsController.createCredential
);

credentialRouter.get(
  "/credential",
  validateToken,
  credentialsController.getAllCredentials
);

credentialRouter.get(
  "/credential/:id",
  validateToken,
  credentialsController.getCredentialById
);

credentialRouter.delete(
  "/credential/delete/:id",
  validateToken,
  credentialsController.deleteCredential
);

export default credentialRouter;
