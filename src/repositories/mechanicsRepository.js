
import { AppDataSource } from "../config/data-source.js";
import { Mechanics } from "../models/Mechanics.js";

export const mechanicsRepository = AppDataSource.getRepository(Mechanics);



