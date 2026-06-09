// src/routes/userTravelRoutes.js
import { Router } from "express";
import {
  getUserTravels,
  getUserTravelById,
  createUserTravel,
  deleteUserTravel,
} from "../controllers/user_travelController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authenticate,  getUserTravels);
router.get("/:id",authenticate,  getUserTravelById);
router.post("/", authenticate, createUserTravel);
router.delete("/:id",authenticate, deleteUserTravel);

export default router;