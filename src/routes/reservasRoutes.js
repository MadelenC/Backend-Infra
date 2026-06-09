import { Router } from "express";
import {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
} from "../controllers/reservasController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();


router.get("/",authenticate,  getReservas);          
router.get("/:id",authenticate,  getReservaById);   
router.post("/",authenticate,  createReserva);       
router.put("/:id",authenticate,  updateReserva);     
router.delete("/:id",authenticate,  deleteReserva);  

export default router;