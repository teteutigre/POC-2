import { Request, Response } from "express";
import httpStatus from "http-status";
import * as credentialService from "../services/credentialService";

export async function createCredential(req: Request, res: Response) {
  const { user } = res.locals;

  const credential = req.body;

  try {
    await credentialService.createCredential(user.id, credential);

    res.status(httpStatus.OK).send("Credential created!");
  } catch (error) {
    if (error.type === "error_conflict") {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    res.status(httpStatus.CONFLICT).send(error);
  }
}
export async function getAllCredentials(req: Request, res: Response) {
  const { user } = res.locals;

  try {
    const allCredentials = await credentialService.allCredentials(user.id);

    res.status(httpStatus.OK).send(allCredentials);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getCredentialById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  try {
    const credential = await credentialService.getCredentialById(user.id, id);

    res.status(httpStatus.OK).send(credential);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send(error);
  }
}
export async function deleteCredential(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  try {
    await credentialService.getCredentialById(user.id, id);
    await credentialService.deleteCredential(id);

    res
      .status(httpStatus.OK)
      .send(`Credential with id ${id} has been removed!`);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send(error);
  }
}
