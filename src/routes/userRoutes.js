import express from "express";
import { getUsers,
   createUser, 
   getUserById, 
   updateUser, 
   deleteUser, 
   changePassword,
   changeUserStatus} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate,getUsers);
router.get("/:id",authenticate,getUserById);
router.post("/", authenticate,createUser);   
router.put("/:id",authenticate, updateUser);
router.delete("/:id",authenticate, deleteUser);
router.get("/:id", authenticate, getUserById);
router.put(
  "/:id/change-password",
  authenticate,
  changePassword
);
router.patch("/:id/status",authenticate, changeUserStatus);

export default router;