import { rolTravelRepository } from "../repositories/rolTravelRepository.js";

export const getAllRolTravel = async () => {
  // Trae todos los roles de viaje con el chofer asociado
  return await rolTravelRepository.find({
    relations: ["user"], // incluye info del chofer
  });
};

export const getRolTravelById = async (id) => {
  const rol = await rolTravelRepository.findOne({
    where: { id },
    relations: ["user"],
  });

  if (!rol) throw new Error("Rol de viaje no encontrado");
  return rol;
};

export const createRolTravel = async (data) => {
  // Creamos el rol de viaje directo, sin crear usuario
  const rolAdd = {
    tipoa: data.tipoa,
    tipob: data.tipob,
    tipoc: data.tipoc,
    fecha: data.fecha,
    cantidad: data.cantidad,
    user: { id: data.chofer_id }, // asignamos el chofer existente
    created_at: new Date(),
    updated_at: new Date(),
  };

  const rolCreate = rolTravelRepository.create(rolAdd);
  return await rolTravelRepository.save(rolCreate);
};

export const updateRolTravel = async (id, data) => {
  const rol = await rolTravelRepository.findOneBy({ id });
  if (!rol) throw new Error("Rol de viaje no encontrado");

  rolTravelRepository.merge(rol, {
    tipoa: data.tipoa,
    tipob: data.tipob,
    tipoc: data.tipoc,
    fecha: data.fecha,
    cantidad: data.cantidad,
    updated_at: new Date(),
  });

  return await rolTravelRepository.save(rol);
};

export const deleteRolTravel = async (id) => {
  const rol = await rolTravelRepository.findOneBy({ id });
  if (!rol) throw new Error("Rol de viaje no encontrado");

  return await rolTravelRepository.remove(rol);
};
