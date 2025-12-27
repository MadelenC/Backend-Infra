import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import { Entidades } from "../models/entidades.js";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // solo desarrollo
  logging: false,                           
  entities: [User, Entidades],   // 👈 pasa el EntitySchema
});
