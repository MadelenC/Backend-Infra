// src/routes/requestRoutes.js
import { Router } from "express";
import {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../controllers/requestController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate,  getRequests);
router.get("/:id", authenticate, getRequestById);
router.post("/", authenticate, createRequest);
router.put("/:id",authenticate,  updateRequest);
router.delete("/:id",authenticate,  deleteRequest);

export default router;