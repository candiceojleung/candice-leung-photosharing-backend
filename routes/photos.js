import express from "express";
const router = express.Router();
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

function readPhotos() {
  const photosData = fs.readFileSync("./data/photos.json");
  const parsedPhotos = JSON.parse(photosData);
  return parsedPhotos;
}

function getPhotoById(id) {
  const photos = readPhotos();
  return photos.find((photo) => photo.id === id) || null;
}

router.get("/photos", (req, res) => {
  const photos = readPhotos();
  res.json(photos);
});

router.get("/photos/:id", (req, res) => {
  const id = req.params.id;
  const photo = getPhotoById(id);
  res.json(photo);
});

router.get("/photos/:id/comments", (req, res) => {
  const id = req.params.id;
  const photo = getPhotoById(id);
  res.json(photo.comments);
});

router.post("/photos/:id/comments", (req, res) => {
  const id = req.params.id;
  const photo = getPhotoById(id);
  const { name, comment } = req.body;
  const newComment = {
    id: uuidv4(),
    name: name,
    comment: comment,
    timestamp: Date.now(),
  };
  photo.comments.push(newComment);
  try {
    fs.writeFileSync("./data/photos.json", JSON.stringify(photo.comments));
    res.json(newComment);
  } catch (error) {
    console.log(error);
  }
});

export default router;
