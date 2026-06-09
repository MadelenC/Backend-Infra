// src/routes/budgetsRoutes.js
import { Router } from "express";
import {
  getBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetsController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate, getBudgets);            
router.get("/:id",authenticate, getBudgetById);      
router.post("/", authenticate, createBudget);         
router.put("/:id", authenticate, updateBudget);       
router.delete("/:id", authenticate,deleteBudget);    

export default router;