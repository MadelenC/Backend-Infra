// src/services/accessoriesService.js
import { accessoriesRepository } from "../repositories/accessoriesRepository.js";

export const getAllAccessories = async () => {
  return await accessoriesRepository.find({
    relations: ["solicitud"],
  });
};

export const getAccessoryById = async (id) => {
  const accessory = await accessoriesRepository.findOne({
    where: { id },
    relations: ["solicitud"],
  });

  if (!accessory) throw new Error("Accesorio no encontrado");
  return accessory;
};

export const createAccessory = async (data) => {
  const nuevo = accessoriesRepository.create({
    nombre: data.nombre,
    solicitud: data.solicitud, 
  });

  return await accessoriesRepository.save(nuevo);
};

export const updateAccessory = async (id, data) => {
  const accessory = await accessoriesRepository.findOneBy({ id });

  if (!accessory) throw new Error("Accesorio no encontrado");

  accessoriesRepository.merge(accessory, {
    nombre: data.nombre,
    solicitud: data.solicitud,
  });

  return await accessoriesRepository.save(accessory);
};

export const deleteAccessory = async (id) => {
  const accessory = await accessoriesRepository.findOneBy({ id });

  if (!accessory) throw new Error("Accesorio no encontrado");

  return await accessoriesRepository.remove(accessory);
};