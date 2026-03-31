import { AppDataSource } from "../config/data-source.js";
import { Returns } from "../models/Returns.js";

export const returnsRepository = AppDataSource.getRepository(Returns);