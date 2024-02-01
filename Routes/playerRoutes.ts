import express from "express";
import {
  createPlayer,
  deletePlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  multiUpload,
} from "../Controllers/playerController";
import { Router } from "express";
import upload from "../middleware/uploadImage";
import { authGuard } from "../Controllers/Auth/authenticator";

const router = Router();

router.get("/get-players", authGuard, getPlayers);
router.get("/get-single-player/:id", getPlayer);
router.post("/create-player", upload.single("image"), createPlayer);
router.post("/multi-upload", upload.array("images[]"), multiUpload);
router.put("/update-player/:id", updatePlayer);
router.delete("/delete-player/:id", deletePlayer);

export default router;
