import { AppDataSource } from "../config/data-source.js";
import { Informedebolu } from "../models/Informedebolu.js";

export const informedeboluRepository =
  AppDataSource.getRepository(Informedebolu);