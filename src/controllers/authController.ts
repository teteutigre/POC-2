import { Request, Response } from "express";
import httpStatus from "http-status";
import { unprocessableError } from "../middlewares/errorMiddleware";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const user = req.body;

  try {
    await authService.signUp(user);
    return res.status(httpStatus.CREATED).json({
      email: user.email,
    });
  } catch (error) {
    if (error.type === "error_conflict") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
  }
}

export async function signIn(req: Request, res: Response) {
  const user = req.body;

  try {
    const token = await authService.signIn(user);
    res.status(httpStatus.OK).send({ email: token.email, token: token.token });
  } catch (error) {
    if (error.type === "error_unauthorized") {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
  }
}
