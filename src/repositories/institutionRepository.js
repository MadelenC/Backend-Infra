// src/repositories/institutionRepository.js
import { AppDataSource } from "../config/data-source.js";
import { Institution } from "../models/Institution.js";

export const institutionRepository = AppDataSource.getRepository(Institution);