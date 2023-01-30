import { Router } from "express";
import authRouter from "./authRouter";
import credentialRouter from "./credentialRouter";
import networkRouter from "./networkRouter";

const router = Router();

router.use(authRouter);
router.use(networkRouter);
router.use(credentialRouter);

export default router;
