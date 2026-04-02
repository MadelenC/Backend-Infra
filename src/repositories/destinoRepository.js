import { AppDataSource } from "../config/data-source.js";
import { destinos } from "../models/Destino.js";

export const destinoRepository =AppDataSource.getRepository(destinos);
