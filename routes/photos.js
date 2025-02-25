import express from "express";
const router = express.Router();
import fs from "fs";

function readPhotos() {
    const photosData = fs.readFileSync("./data/photos.json");
    const parsedPhotos = JSON.parse(photosData);
    return parsedPhotos;
}

function getPhotoById(id) {
    const photos = readPhotos();
    return photos.find(photo => photo.id === id) || null;
}

router.get("/photos", (req,res)=>{
    const photos= readPhotos(); 
    res.json(photos)
});

router.get("/photos/:id",(req,res)=>{
    const id = req.params.id;
    const photo = getPhotoById(id);
    res.json(photo)
}); 



export default router