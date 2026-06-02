import express from 'express';
import { register, login } from '../controllers/authController.js';

import { authenticate } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

import { updateAvatar } from "../services/userService.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post(
  "/upload-avatar",
  authenticate,
  upload.single("file"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          message: "No se envió imagen",
        });
      }

      const imageUrl = `${process.env.BASE_URL}/uploads/avatars/${req.file.filename}`;

      // guardar avatar en DB
      await updateAvatar(
        req.user.id,
        imageUrl
      );

      res.json({
        url: imageUrl,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Error al subir avatar",
      });

    }
  }
);

export default router;
