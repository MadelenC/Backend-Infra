import { AppDataSource } from "../config/data-source.js";
import { tripReport } from "../models/tripReport.js";

export const tripReportRepository = AppDataSource.getRepository(tripReport);