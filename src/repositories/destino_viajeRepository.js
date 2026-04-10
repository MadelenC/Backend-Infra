// src/repositories/destinoViajeRepository.js
import { AppDataSource } from "../config/data-source.js";
import { DestinoViaje } from "../models/Destino_viaje.js";

export const destinoViajeRepository =
  AppDataSource.getRepository(DestinoViaje);