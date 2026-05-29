// src/routes/tripReportRoutes.js
import { Router } from "express";
import {
  getTripReports,
  getTripReportById,
  createTripReport,
  updateTripReport,
  deleteTripReport,
   getMyDriverReports,
} from "../controllers/tripReportController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getTripReports);
router.get("/my-driver-reports",authenticate,getMyDriverReports);
router.get("/:id", getTripReportById);
router.post("/", createTripReport);
router.put("/:id", updateTripReport);
router.delete("/:id", deleteTripReport);


export default router;