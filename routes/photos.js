import express from "express";
const router = express.Router();
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

function getPhotos() {
  const photosData = fs.readFileSync("./data/photos.json");
  const parsedPhotos = JSON.parse(photosData);
  return parsedPhotos;
}

function getPhotoById(id) {
  const photos = getPhotos();
  return photos.find((photo) => photo.id === id) || null;
}

router.get("/photos", (req, res) => {
  const photos = getPhotos();
  res.json(photos);
});

router.get("/photos/:id", (req, res) => {
  const id = req.params.id;
  const photo = getPhotoById(id);

  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404).json({ message: "Photo not found" });
  }
});

router.get("/photos/:id/comments", (req, res) => {
  const id = req.params.id;
  const photo = getPhotoById(id);

  if (photo) {
    res.status(200).json(photo.comments);
  } else {
    res.status(404).json({ message: "Photo not found" });
  }
});

router.post("/photos/:id/comments", (req, res) => {
  const id = req.params.id;
  const { name, comment } = req.body;

  if (name.trim() === "" || comment.trim() === "") {
    return res
      .status(400)
      .json({ message: "Name and comment are required and must not be empty" });
  }

  const photos = getPhotos();
  const newComment = {
    id: uuidv4(),
    name: name,
    comment: comment,
    timestamp: Date.now(),
  };

  const photo = photos.find((photo) => photo.id === id);
  if (!photo) {
    return res.status(404).json({ message: "Photo not found" });
  }

  photo.comments.push(newComment);
  try {
    fs.writeFileSync("./data/photos.json", JSON.stringify(photos, null, 2));
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
  }
});

export default router;
