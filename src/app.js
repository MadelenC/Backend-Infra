import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 

dotenv.config();

const app = express();
app.use(express.json());

//Middleare CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  Credential: true
}));

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); 



export default app;