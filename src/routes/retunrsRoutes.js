import { Router } from "express";
import {
  getReturns,
  getReturnById,
  createReturn,
  updateReturn,
  deleteReturn,
} from "../controllers/retunrsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate,  getReturns);
router.get("/:id", authenticate, getReturnById);
router.post("/",authenticate,  createReturn);
router.put("/:id",authenticate,  updateReturn);
router.delete("/:id",authenticate,  deleteReturn);

export default router;