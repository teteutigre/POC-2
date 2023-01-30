import { Router } from "express";
import { validateSchema } from "../middlewares/validations/schemaValidator";
import * as authController from "../controllers/authController";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signUp", validateSchema(signUpSchema), authController.signUp);
authRouter.post("/signIn", validateSchema(signInSchema), authController.signIn);

export default authRouter;
