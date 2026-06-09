import { Router } from "express";
import { getSalidaById } from "../controllers/reporteSalidaController.js";

const router = Router();

router.get("/salidas/:id",authenticate,  getSalidaById);
import { authenticate } from "../middlewares/authMiddleware.js";

export default router;  