import express from "express";
const router = express.Router();
import readFiles from "../utils.js";

function readTags() {
  try {
    return readFiles("tags");
  } catch (error) {
    console.log(error);
  }
}

router.get("/tags", (req, res) => {
  try {
    const tags = readTags();
    res.json(tags);
  } catch (error) {
    console.log("Error getting tags", error);
  }
});

export default router;
