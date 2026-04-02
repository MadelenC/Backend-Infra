// src/routes/requestRoutes.js
import { Router } from "express";
import {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../controllers/requestController.js";

const router = Router();

router.get("/", getRequests);
router.get("/:id", getRequestById);
router.post("/", createRequest);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;