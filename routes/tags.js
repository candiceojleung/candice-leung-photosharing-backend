import express from "express";
const router = express.Router();
import fs from "fs";

function readTags() {
  const tagsData = fs.readFileSync("./data/tags.json");
  const parsedTags = JSON.parse(tagsData);
  return parsedTags;
}

router.get("/tags", (req, res) => {
  const tags = readTags();
  res.json(tags);
});

export default router;
