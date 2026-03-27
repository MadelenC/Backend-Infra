import { AppDataSource } from "../config/data-source.js";
import { Maintenance } from "../models/Maintenance.js";

export const maintenanceRepository = AppDataSource.getRepository(Maintenance);