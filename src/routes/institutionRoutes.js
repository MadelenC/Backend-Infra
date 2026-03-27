// src/routes/institutionRoutes.js
import { Router } from "express";
import {
  getInstitutions,
  getInstitutionById,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from "../controllers/institutionController.js";

const router = Router();

router.get("/", getInstitutions);
router.get("/:id", getInstitutionById);
router.post("/", createInstitution);
router.put("/:id", updateInstitution);
router.delete("/:id", deleteInstitution);

export default router;