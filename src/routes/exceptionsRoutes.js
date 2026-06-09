// src/routes/exceptionsRoutes.js
import { Router } from "express";
import {
  getExceptions,
  getExceptionById,
  createException,
  updateException,
  deleteException,
} from "../controllers/exceptionsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getExceptions);
router.get("/:id",authenticate,  getExceptionById);
router.post("/",authenticate,  createException);
router.put("/:id", authenticate, updateException);
router.delete("/:id", authenticate, deleteException);

export default router;