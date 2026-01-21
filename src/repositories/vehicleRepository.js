// repositories/rolTravelRepository.js
import { AppDataSource } from "../config/data-source.js";
import { Vehiculos } from "../models/vehicle.js"; 

export const vehicleRepository = AppDataSource.getRepository(Vehiculos);