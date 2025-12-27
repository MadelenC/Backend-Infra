// repositories/entidadesRepository.js
import { AppDataSource } from "../config/data-source.js";
import { Entidades } from "../models/entidades.js"; 

export const entidadesRepository = AppDataSource.getRepository(Entidades);
