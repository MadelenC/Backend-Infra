import { AppDataSource } from "../config/data-source.js";
import { kilomeinformes } from "../models/kilomeinformes.js";

export const kilomeinformesRepository =
  AppDataSource.getRepository(kilomeinformes);