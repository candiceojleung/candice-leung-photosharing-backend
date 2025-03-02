import express from "express";
const router = express.Router();
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import readFiles from "../utils.js";

function getPhotos() {
  try {
    return readFiles("photos");
  } catch (error) {
    console.log(error);
  }
}

function getPhotoById(id) {
  try {
    const photos = getPhotos();
    return photos.find((photo) => photo.id === id) || null;
  } catch (error) {
    console.log(error);
  }
}

//get all photos
router.get("/photos", (req, res) => {
  try {
    const photos = getPhotos();
    res.json(photos);
  } catch (error) {
    console.log("Error getting all photos", error);
  }
});

//get photo by id
router.get("/photos/:id", (req, res) => {
  try {
    const id = req.params.id;
    const photo = getPhotoById(id);

    if (photo) {
      res.status(200).json(photo);
    } else {
      res.status(404).json({ message: "Photo not found" });
    }
  } catch (error) {
    console.log("Error getting photos by id", error);
  }
});

//get comment by photo id
router.get("/photos/:id/comments", (req, res) => {
  try {
    const id = req.params.id;
    const photo = getPhotoById(id);

    if (photo) {
      res.status(200).json(photo.comments);
    } else {
      res.status(404).json({ message: "Photo not found" });
    }
  } catch (error) {
    console.log("Error getting comments by photo id", error);
  }
});

//post comment
router.post("/photos/:id/comments", (req, res) => {
  try {
    const id = req.params.id;
    const { name, comment } = req.body;
    if (name.trim() === "" || comment.trim() === "") {
      return res.status(400).json({
        message: "Name and comment are required and must not be empty",
      });
    }

    const photos = getPhotos();

    const newComment = {
      name: name,
      comment: comment,
      id: uuidv4(),
      timestamp: Date.now(),
    };

    const photo = photos.find((photo) => photo.id === id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    photo.comments.push(newComment);

    fs.writeFileSync("./data/photos.json", JSON.stringify(photos, null, 2));
    res.status(201).json(newComment);
  } catch (error) {
    console.log("Error adding comment", error);
  }
});

export default router;
