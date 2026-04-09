// src/services/vehicleTravelService.js
import { vehicleTravelRepository } from "../repositories/vehicle_travelRepository.js";

export const getAllVehicleTravels = async () => {
  return await vehicleTravelRepository.find();
};

export const getVehicleTravelById = async (id) => {
  const data = await vehicleTravelRepository.findOne({
    where: { id },
  });

  if (!data) throw new Error("Relación no encontrada");
  return data;
};

export const createVehicleTravel = async (data) => {
  const nuevo = vehicleTravelRepository.create({
    vehiculo: { id: data.vehiculo_id },
    viaje: { id: data.viaje_id },
  });

  return await vehicleTravelRepository.save(nuevo);
};

export const deleteVehicleTravel = async (id) => {
  const data = await vehicleTravelRepository.findOneBy({ id });

  if (!data) throw new Error("Relación no encontrada");

  return await vehicleTravelRepository.remove(data);
};