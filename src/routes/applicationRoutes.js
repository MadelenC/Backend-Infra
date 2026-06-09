// src/routes/applicationRoutes.js
import { Router } from "express";
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/",  authenticate, getApplications);
router.get("/:id", authenticate,getApplicationById);
router.post("/", authenticate,createApplication);
router.put("/:id", authenticate,updateApplication);
router.delete("/:id",authenticate, deleteApplication);

export default router;