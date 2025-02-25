import express from "express";
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;
// import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import "dotenv/config";
import tags from "./routes/tags.js";

app.use(express.json());

const { CORS_ORIGIN } = process.env;
app.use(cors({ origin: CORS_ORIGIN }));

app.get ('/tags', tags)

app.listen(port, () => console.log(`Listening on ${port}`));