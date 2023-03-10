import joi from "joi";

export const createCredentialSchema = joi.object({
  title: joi.string().required(),
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});
