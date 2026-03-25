// src/routes/accessoriesRoutes.js
import { Router } from "express";
import {
  getAccessories,
  getAccessoryById,
  createAccessory,
  updateAccessory,
  deleteAccessory,
} from "../controllers/accessoriesController.js";

const router = Router();

router.get("/", getAccessories);
router.get("/:id", getAccessoryById);
router.post("/", createAccessory);
router.put("/:id", updateAccessory);
router.delete("/:id", deleteAccessory);

export default router;