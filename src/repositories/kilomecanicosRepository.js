import { AppDataSource } from "../config/data-source.js";
import { kilomecanicos } from "../models/kilomecanicos.js";

export const kilomecanicosRepository =
  AppDataSource.getRepository(kilomecanicos);