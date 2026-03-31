import { Router } from "express";
import {
  getReturns,
  getReturnById,
  createReturn,
  updateReturn,
  deleteReturn,
} from "../controllers/retunrsController.js";

const router = Router();

router.get("/", getReturns);
router.get("/:id", getReturnById);
router.post("/", createReturn);
router.put("/:id", updateReturn);
router.delete("/:id", deleteReturn);

export default router;