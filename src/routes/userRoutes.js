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

router.get("/", getUsers);
router.get("/:id",getUserById);
router.post("/", createUser);   
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", authenticate, getUserById);
router.put(
  "/:id/change-password",
  authenticate,
  changePassword
);
router.patch("/:id/status", changeUserStatus);

export default router;