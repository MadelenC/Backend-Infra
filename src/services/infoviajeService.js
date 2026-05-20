// services/infoviajeService.js
import { infoviajeRepository } from "../repositories/infoviajeRepository.js";

export const getAllInfoviajes = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {

  const qb = infoviajeRepository
    .createQueryBuilder("infoviaje")
    .leftJoinAndSelect("infoviaje.viaje", "viaje")
    .orderBy("infoviaje.id", "DESC");

  if (search) {
    qb.where("viaje.nombre ILIKE :search", {
      search: `%${search}%`,
    });
  }

  const [data, total] = await qb
    .skip((Number(page) - 1) * Number(limit))
    .take(Number(limit))
    .getManyAndCount();

  return {
    data,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
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