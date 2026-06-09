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

router.get("/",authenticate, getTripReports);
router.get("/my-driver-reports",authenticate,getMyDriverReports);
router.get("/:id",authenticate,  getTripReportById);
router.post("/", authenticate, createTripReport);
router.put("/:id",authenticate,  updateTripReport);
router.delete("/:id", authenticate, deleteTripReport);


export default router;