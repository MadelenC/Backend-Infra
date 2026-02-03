import { AppDataSource } from "../config/data-source.js";
import { Modelos } from "../models/models.js";

export const modelosRepository = AppDataSource.getRepository(Modelos) ;