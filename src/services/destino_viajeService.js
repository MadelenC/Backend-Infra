// src/services/destinoViajeService.js
import { destinoViajeRepository } from "../repositories/destino_viajeRepository.js";

export const getAllDestinoViajes = async () => {
  return await destinoViajeRepository.find({
    relations: ["destino", "viaje"], // importante
  });
};

export const getDestinoViajeById = async (id) => {
  const data = await destinoViajeRepository.findOne({
    where: { id },
    relations: ["destino", "viaje"],
  });

  if (!data) throw new Error("Relación destino-viaje no encontrada");
  return data;
};

export const createDestinoViaje = async (data) => {
  const nuevo = destinoViajeRepository.create({
    destino: { id: data.destino_id },
    viaje: { id: data.viaje_id },
  });

  return await destinoViajeRepository.save(nuevo);
};

export const deleteDestinoViaje = async (id) => {
  const data = await destinoViajeRepository.findOneBy({ id });

  if (!data) throw new Error("Relación destino-viaje no encontrada");

  return await destinoViajeRepository.remove(data);
};