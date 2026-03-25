import { AppDataSource } from "../config/data-source.js";
import { application } from "../models/Application.js";

export const applicationRepository = AppDataSource.getRepository(application);