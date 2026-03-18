// src/routes/budgetsRoutes.js
import { Router } from "express";
import {
  getBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetsController.js";

const router = Router();

router.get("/", getBudgets);            
router.get("/:id", getBudgetById);      
router.post("/", createBudget);         
router.put("/:id", updateBudget);       
router.delete("/:id", deleteBudget);    

export default router;