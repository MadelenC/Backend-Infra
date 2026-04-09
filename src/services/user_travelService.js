// src/services/userTravelService.js
import { userTravelRepository } from "../repositories/user_travelRepository.js";

export const getAllUserTravels = async () => {
  return await userTravelRepository.find();
};

export const getUserTravelById = async (id) => {
  const data = await userTravelRepository.findOne({
    where: { id },
  });

  if (!data) throw new Error("Relación no encontrada");
  return data;
};

export const createUserTravel = async (data) => {
  const nuevo = userTravelRepository.create({
    user: { id: data.user_id },
    viaje: { id: data.viaje_id },
  });

  return await userTravelRepository.save(nuevo);
};

export const deleteUserTravel = async (id) => {
  const data = await userTravelRepository.findOneBy({ id });

  if (!data) throw new Error("Relación no encontrada");

  return await userTravelRepository.remove(data);
};