// src/routes/accessoriesRoutes.js
import { Router } from "express";
import {
  getAccessories,
  getAccessoryById,
  createAccessory,
  updateAccessory,
  deleteAccessory,
} from "../controllers/accessoriesController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate,getAccessories);
router.get("/:id",authenticate, getAccessoryById);
router.post("/",authenticate, createAccessory);
router.put("/:id", authenticate,updateAccessory);
router.delete("/:id", authenticate,deleteAccessory);

export default router;