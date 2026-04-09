// src/repositories/vehicleTravelRepository.js
import { AppDataSource } from "../config/data-source.js";
import { VehicleTravel } from "../models/vehicle_travel.js";

export const vehicleTravelRepository =
  AppDataSource.getRepository(VehicleTravel);