// src/routes/userTravelRoutes.js
import { Router } from "express";
import {
  getUserTravels,
  getUserTravelById,
  createUserTravel,
  deleteUserTravel,
} from "../controllers/user_travelController.js";

const router = Router();

router.get("/", getUserTravels);
router.get("/:id", getUserTravelById);
router.post("/", createUserTravel);
router.delete("/:id", deleteUserTravel);

export default router;