import { Router } from "express";
import { getSalidaById } from "../controllers/reporteSalidaController.js";

const router = Router();

router.get("/salidas/:id", getSalidaById);

export default router;  