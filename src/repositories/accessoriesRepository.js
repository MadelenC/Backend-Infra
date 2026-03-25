// src/repositories/accessoriesRepository.js
import { AppDataSource } from "../config/data-source.js";
import { Accessories } from "../models/Accessories.js";

export const accessoriesRepository =
  AppDataSource.getRepository(Accessories);