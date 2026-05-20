import { budgetsRepository } from "../repositories/budgetsRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { vehicleRepository } from "../repositories/vehicleRepository.js";
import { viajesRepository } from "../repositories/travelRepository.js";

// Presupuestos
export const countBudgets = async () => {
  return await budgetsRepository.count();
};

// Usuarios
export const countUsers = async () => {
  return await userRepository.count();
};

// Vehículos
export const countVehicles = async () => {
  return await vehicleRepository.count();
};

// Viajes
export const countTrips = async () => {
  return await viajesRepository.count();
};