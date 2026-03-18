import { AppDataSource } from "../config/data-source.js";
import { budgets } from "../models/budgets.js";

export const budgetsRepository = AppDataSource.getRepository(budgets);