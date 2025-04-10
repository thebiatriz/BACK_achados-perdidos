import dotenv from "dotenv";
import express from "express";
import { router } from "./routes/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log("Running server on port", PORT);
});