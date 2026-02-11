import { vehicleRepository } from "../repositories/vehicleRepository.js";

export const getAllVehicles = async () => {
  // Trae todos los vehículos
  return await vehicleRepository.find({
    relations: ["modelos"],  
  });
};

export const getVehicleById = async (id) => {
  const vehicle = await vehicleRepository.findOneBy({ id });
  if (!vehicle) throw new Error("Vehículo no encontrado");
  return vehicle;
};

export const createVehicle = async (data) => {
  const vehicleData = {
    codigo: data.codigo,
    placa: data.placa,
    color: data.color,
    pasajeros: data.pasajeros,
    tipog: data.tipog,
    estado: data.estado,
    combustible: data.combustible,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const newVehicle = vehicleRepository.create(vehicleData);
  return await vehicleRepository.save(newVehicle);
};

export const updateVehicle = async (id, data) => {
  const vehicle = await vehicleRepository.findOneBy({ id });
  if (!vehicle) throw new Error("Vehículo no encontrado");

  vehicleRepository.merge(vehicle, {
    codigo: data.codigo,
    placa: data.placa,
    color: data.color,
    pasajeros: data.pasajeros,
    tipog: data.tipog,
    estado: data.estado,
    combustible: data.combustible,
    updated_at: new Date(),
  });

  return await vehicleRepository.save(vehicle);
};

export const deleteVehicle = async (id) => {
  const vehicle = await vehicleRepository.findOneBy({ id });
  if (!vehicle) throw new Error("Vehículo no encontrado");

  return await vehicleRepository.remove(vehicle);
};
