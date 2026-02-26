import { AppDataSource } from "../config/data-source.js";
import { Rutas } from "../models/routes.js";

export const rutasRepository = AppDataSource.getRepository(Rutas);