// src/services/institutionService.js
import { institutionRepository } from "../repositories/institutionRepository.js";

// Obtener todas las instituciones
export const getAllInstitutions = async () => {
  return await institutionRepository.find({
    relations: ["maintenances"], 
  });
};

// Obtener por ID
export const getInstitutionById = async (id) => {
  const institution = await institutionRepository.findOne({
    where: { id },
    relations: ["maintenances"], // opcional
  });
  if (!institution) throw new Error("Institution no encontrada");
  return institution;
};

// Crear
export const createInstitution = async (data) => {
  const nuevo = institutionRepository.create({
    nombre: data.nombre,
  });

  return await institutionRepository.save(nuevo);
};

// Actualizar
export const updateInstitution = async (id, data) => {
  const institution = await institutionRepository.findOneBy({ id });
  if (!institution) throw new Error("Institution no encontrada");

  institutionRepository.merge(institution, data);
  return await institutionRepository.save(institution);
};

// Eliminar
export const deleteInstitution = async (id) => {
  const institution = await institutionRepository.findOneBy({ id });
  if (!institution) throw new Error("Institution no encontrada");

  return await institutionRepository.remove(institution);
};