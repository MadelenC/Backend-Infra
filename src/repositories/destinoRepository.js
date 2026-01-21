import { AppDataSource } from "../config/data-source.js";
import { destinos } from "../models/destino.js";

export const destinoRepository =
  AppDataSource.getRepository(destinos);
