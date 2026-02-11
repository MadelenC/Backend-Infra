import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import { Entidades } from "../models/entidades.js";
import { Roles } from "../models/rolTravel.js";
import { Vehiculos } from "../models/vehicle.js";
import { destinos } from "../models/destino.js";
import { Mapas } from "../models/mapas.js";
import {Modelos} from "../models/models.js"
import {Marcas} from "../models/marcs.js"


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
  entities: [User, Entidades, Roles, Vehiculos, destinos, Mapas, Modelos, Marcas ],   // 👈 pasa el EntitySchema
});
