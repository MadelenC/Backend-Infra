import { AppDataSource } from "../config/data-source.js";
import { Marcas } from "../models/marcs.js";

export const marcasRepository = AppDataSource.getRepository(Marcas) ;