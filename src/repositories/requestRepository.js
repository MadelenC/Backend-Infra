// src/repositories/requestRepository.js
import { AppDataSource } from "../config/data-source.js";
import { Requests } from "../models/Requests.js";

export const requestRepository = AppDataSource.getRepository(Requests);