import { Router } from "express";
import {
  getMaintenances,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenanceController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getMaintenances);
router.get("/:id",authenticate,  getMaintenanceById);
router.post("/", authenticate, createMaintenance);
router.put("/:id", authenticate, updateMaintenance);
router.delete("/:id",authenticate,  deleteMaintenance);

export default router;