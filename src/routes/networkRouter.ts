import { Router } from "express";
import { validateSchema } from "../middlewares/validations/schemaValidator";
import { validateToken } from "../middlewares/validations/tokenValidator";
import { createWifiSchema } from "../schemas/networkSchema";
import * as networkController from "../controllers/networkController";

const networkRouter = Router();

networkRouter.post(
  "/wifi/create",
  validateToken,
  validateSchema(createWifiSchema),
  networkController.createNetwork
);

networkRouter.get("/wifi", validateToken, networkController.allNetwork);

networkRouter.get("/wifi/:id", validateToken, networkController.getNetworkById);

networkRouter.delete(
  "/wifi/delete/:id",
  validateToken,
  networkController.deleteNetwork
);

export default networkRouter;
