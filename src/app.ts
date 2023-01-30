import express, { json, Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router";
import errorHandler from "./middlewares/errorMiddleware";
import { connectDb } from "./config/database";

//CONFIGS
dotenv.config();
const app = express();
app.use([cors(), json()]);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

app.use(router);
app.use(errorHandler);

//SERVER
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);

export default app;
