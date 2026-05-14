
import { mechanicsRepository } from "../repositories/mechanicsRepository.js";

// Get all mechanics
export const getAllMechanics = async () => {
  return await mechanicsRepository.find({
    relations: ["solicitud","solicitud.vehiculo", "devoluciones", "kilomecanicos"], 
  });
};


export const getMechanicById = async (id) => {
  const mechanic = await mechanicsRepository.findOne({
    where: { id },
    relations: ["solicitud","solicitud.vehiculo","devoluciones", "kilomecanicos"],
  });

  if (!mechanic) throw new Error("Mechanic not found");
  return mechanic;
};


export const createMechanic = async (data) => {
  const newMechanic = mechanicsRepository.create({
    fecha: data.fecha,
    cantidad: data.cantidad,
    unidad: data.unidad,
    trabajo: data.trabajo,
    marca: data.marca,
    codigo: data.codigo,
    observacion: data.observacion,
    kilometraje: data.kilometraje,
     insertador: data.insertador,
    solicitud_id: data.solicitud_id,
    created_at: new Date(),
    updated_at: new Date(),
  });
  

  return await mechanicsRepository.save(newMechanic);
};


export const updateMechanic = async (id, data) => {
  const mechanic = await mechanicsRepository.findOneBy({ id });

  if (!mechanic) throw new Error("Mechanic not found");

  mechanicsRepository.merge(mechanic, data);
  return await mechanicsRepository.save(mechanic);
};


export const deleteMechanic = async (id) => {
  const mechanic = await mechanicsRepository.findOneBy({ id });

  if (!mechanic) throw new Error("Mechanic not found");

  return await mechanicsRepository.remove(mechanic);
};



