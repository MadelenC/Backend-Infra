// src/repositories/userTravelRepository.js
import { AppDataSource } from "../config/data-source.js";
import { UserTravel } from "../models/User_travel.js";

export const userTravelRepository =
  AppDataSource.getRepository(UserTravel);