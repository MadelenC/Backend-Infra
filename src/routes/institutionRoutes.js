// src/routes/institutionRoutes.js
import { Router } from "express";
import {
  getInstitutions,
  getInstitutionById,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from "../controllers/institutionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getInstitutions);
router.get("/:id",authenticate,  getInstitutionById);
router.post("/",authenticate,  createInstitution);
router.put("/:id",authenticate,  updateInstitution);
router.delete("/:id", authenticate, deleteInstitution);

export default router;