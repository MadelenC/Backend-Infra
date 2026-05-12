// repositories/infoviajeRepository.js
import { AppDataSource } from "../config/data-source.js";
import { infoviaje } from "../models/infoviaje.js";

export const infoviajeRepository =
  AppDataSource.getRepository(infoviaje);