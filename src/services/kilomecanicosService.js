import { kilomecanicosRepository } from "../repositories/kilomecanicosRepository.js";


// OBTENER TODOS
export const getAllKilomecanicos = async () => {

  return await kilomecanicosRepository.find({
    relations: ["mecanico", "vehiculo"],
  });

};


// OBTENER POR ID
export const getKilomecanicoById = async (id) => {

  const data = await kilomecanicosRepository.findOne({
    where: { id },
    relations: ["mecanico", "vehiculo"],
  });

  if (!data) {
    throw new Error("Kilometraje mecánico no encontrado");
  }

  return data;
};


// CREAR
export const createKilomecanico = async (data) => {

  const nuevo = kilomecanicosRepository.create({

    hay: data.hay,
    aumento: data.aumento,
    total: data.total,

    mecanico: {
      id: data.mecanico_id,
    },

    vehiculo: {
      id: data.vehiculo_id,
    },
  });

  return await kilomecanicosRepository.save(nuevo);
};


// ELIMINAR
export const deleteKilomecanico = async (id) => {

  const data = await kilomecanicosRepository.findOneBy({ id });

  if (!data) {
    throw new Error("Kilometraje mecánico no encontrado");
  }

  return await kilomecanicosRepository.remove(data);
};