// services/infoviajeService.js
import { infoviajeRepository } from "../repositories/infoviajeRepository.js";

export const getAllInfoviajes = async ({
  page = 1,
  limit = 10,
}) => {
  const [data, total] = await infoviajeRepository.findAndCount({
    relations: ["viaje"],
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    data,
    total,
    page,
    limit,
  };
};

export const getInfoviajeById = async (id) => {
  const infoviaje = await infoviajeRepository.findOne({
    where: { id },
    relations: ["viaje", ],
  });

  if (!infoviaje) {
    throw new Error("Infoviaje no encontrado");
  }

  return infoviaje;
};

export const createInfoviaje = async (data) => {
  const newInfoviaje = infoviajeRepository.create(data);

  return await infoviajeRepository.save(newInfoviaje);
};

export const updateInfoviaje = async (id, data) => {
  const infoviaje = await getInfoviajeById(id);

  infoviajeRepository.merge(infoviaje, data);

  return await infoviajeRepository.save(infoviaje);
};

export const deleteInfoviaje = async (id) => {
  const infoviaje = await getInfoviajeById(id);

  return await infoviajeRepository.remove(infoviaje);
};