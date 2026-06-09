import { Router } from "express";

import {
  getInformedebolu,
  getInformedeboluById,
  createInformedebolu,
  updateInformedebolu,
  deleteInformedebolu,
} from "../controllers/informedeboluController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getInformedebolu);

router.get("/:id",authenticate, getInformedeboluById);

router.post("/", authenticate, createInformedebolu);

router.put("/:id",authenticate,  updateInformedebolu);

router.delete("/:id", authenticate, deleteInformedebolu);

export default router;