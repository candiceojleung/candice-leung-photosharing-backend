import express from "express";
const router = express.Router();
import fs from "fs";

function readTags() {
  try {
    const tagsData = fs.readFileSync("./data/tags.json");
    const parsedTags = JSON.parse(tagsData);
    return parsedTags;
  } catch (error) {
    console.log(error);
  }
}

router.get("/tags", (req, res) => {
  try{
    const tags = readTags();
    res.json(tags);
  }catch(error){
    console.log(error);
  }

});

export default router;
