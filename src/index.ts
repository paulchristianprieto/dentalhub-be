import express, { Express } from "express";

import { config } from "dotenv";
config();

import bodyParser from "body-parser";
import cors from "cors";
import appointmentRoutes from "./appointmentRoutes";
import { env } from "./globals";

const app: Express = express();
const port = env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/appointments", appointmentRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
