import { rolTravelRepository } from "../repositories/rolTravelRepository.js";

export const getAllRolTravel = async () => {
  return await rolTravelRepository.find({ relations: ["user", "exceptions"] });
};

export const getRolTravelById = async (id) => {
  const rol = await rolTravelRepository.findOne({
    where: { id },
    relations: ["user", "exceptions"],
  });

  if (!rol) throw new Error("Rol de viaje no encontrado");
  return rol;
};

export const createRolTravel = async (data) => {
  if (!data.chofer_id) throw new Error("Debe enviar chofer_id");

  const rolAdd = {
    tipoa: data.tipoa || "",
    tipob: data.tipob || "",
    tipoc: data.tipoc || "",
    fecha: data.fecha || new Date().toISOString(),
    cantidad: data.cantidad || 1,
    user: { id: data.chofer_id }, 
    created_at:new Date(),
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
    created_at:new Date(),
    updated_at: new Date(),
  });

  return await rolTravelRepository.save(rol);
};

export const deleteRolTravel = async (id) => {
  const rol = await rolTravelRepository.findOneBy({ id });
  if (!rol) throw new Error("Rol de viaje no encontrado");

  return await rolTravelRepository.remove(rol);
};