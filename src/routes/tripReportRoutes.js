// src/routes/tripReportRoutes.js
import { Router } from "express";
import {
  getTripReports,
  getTripReportById,
  createTripReport,
  updateTripReport,
  deleteTripReport,
} from "../controllers/tripReportController.js";

const router = Router();

router.get("/", getTripReports);
router.get("/:id", getTripReportById);
router.post("/", createTripReport);
router.put("/:id", updateTripReport);
router.delete("/:id", deleteTripReport);

export default router;