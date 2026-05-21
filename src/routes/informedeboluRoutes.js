import { Router } from "express";

import {
  getInformedebolu,
  getInformedeboluById,
  createInformedebolu,
  updateInformedebolu,
  deleteInformedebolu,
} from "../controllers/informedeboluController.js";

const router = Router();

router.get("/", getInformedebolu);

router.get("/:id", getInformedeboluById);

router.post("/", createInformedebolu);

router.put("/:id", updateInformedebolu);

router.delete("/:id", deleteInformedebolu);

export default router;