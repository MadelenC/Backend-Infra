// src/repositories/exceptionsRepository.js
import { AppDataSource } from "../config/data-source.js";
import { Exceptions } from "../models/Exceptions.js";

export const exceptionsRepository = AppDataSource.getRepository(Exceptions);