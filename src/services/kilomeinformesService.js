import { kilomeinformesRepository } from "../repositories/kilomeinformesRepository.js";



export const getAllKilomeinformes = async () => {
  return await kilomeinformesRepository.find({
    relations: ["informeviaje", "vehiculo"],
  });
};


export const getKilomeinformeById = async (id) => {
  const data = await kilomeinformesRepository.findOne({
    where: { id },
    relations: ["informeviaje", "vehiculo"],
  });

  if (!data) {
    throw new Error("Kilometraje informe no encontrado");
  }

  return data;
};



export const createKilomeinforme = async (data) => {

  const nuevo = kilomeinformesRepository.create({

    hay: data.hay,
    aumento: data.aumento,
    total: data.total,

    informeviaje: {
      id: data.informeviaje_id,
    },

    vehiculo: {
      id: data.vehiculo_id,
    },
  });

  return await kilomeinformesRepository.save(nuevo);
};


// ELIMINAR
export const deleteKilomeinforme = async (id) => {

  const data = await kilomeinformesRepository.findOneBy({ id });

  if (!data) {
    throw new Error("Kilometraje informe no encontrado");
  }

  return await kilomeinformesRepository.remove(data);
};