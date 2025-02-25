import express from "express";
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;
import { v4 as uuidv4 } from "uuid";
app.use(express.json());
import cors from "cors";
import "dotenv/config";

const { CORS_ORIGIN } = process.env;
app.use(cors({ origin: CORS_ORIGIN }));

app.listen(port, () => console.log(`Listening on ${port}`));