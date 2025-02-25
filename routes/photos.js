import express from "express";
const router = express.Router();
import fs from "fs";

function readPhotos() {
    const photosData = fs.readFileSync("./data/photos.json");
    const parsedPhotos = JSON.parse(photosData);
    return parsedPhotos;
}

router.get("/photos", (req,res)=>{
    const photos= readPhotos(); 
    res.json(photos)
});

export default router