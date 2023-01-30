import { Request, Response } from "express";
import httpStatus from "http-status";
import * as networkService from "../services/networkService";

export async function createNetwork(req: Request, res: Response) {
  try {
    const network = req.body;
    const { user } = res.locals;

    await networkService.createNetwork(user.id, network);
    res.status(httpStatus.CREATED).send("Network created!");
  } catch (error) {
    res.status(httpStatus.CONFLICT).send(error);
  }
}

export async function allNetwork(req: Request, res: Response) {
  const { user } = res.locals;

  try {
    const allNetwork = await networkService.allNetwork(user.id);

    res.status(httpStatus.OK).send(allNetwork);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getNetworkById(req: Request, res: Response) {
  const { user } = res.locals;
  const id = Number(req.params.id);

  try {
    const network = await networkService.getNetworkById(user.id, id);

    res.status(httpStatus.OK).send(network);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function deleteNetwork(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { user } = res.locals;

  try {
    await networkService.getNetworkById(user.id, id);
    await networkService.deleteNetwork(id);

    res
      .status(httpStatus.OK)
      .send(`Credential with id ${id} has been removed!`);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send(error);
  }
}
