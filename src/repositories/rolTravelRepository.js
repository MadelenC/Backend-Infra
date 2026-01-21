// repositories/rolTravelRepository.js
import { AppDataSource } from "../config/data-source.js";
import { Roles } from "../models/rolTravel.js"; 

export const rolTravelRepository = AppDataSource.getRepository(Roles);