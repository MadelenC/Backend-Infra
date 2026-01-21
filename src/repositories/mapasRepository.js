import { AppDataSource } from "../config/data-source.js";
import { Mapas } from "../models/mapas.js";

export const mapasRepository = AppDataSource.getRepository(Mapas);
