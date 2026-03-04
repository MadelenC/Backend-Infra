import { entidadesRepository } from "../repositories/entidadesRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const getAllEntidades = async () => {
  return await entidadesRepository.find({ relations: ["user"] });
};

export const getEntidadById = async (id) => {
  const entidad = await entidadesRepository.findOne({
    where: { id },
    relations: ["user"],
  });
  if (!entidad) throw new Error("Entidad no encontrada");
  return entidad;
};

export const createEntidad = async (data) => {
  try {
    const entidadAdd = {
      facultad: data.facultad,
      carrera: data.carrera,
      materia: data.materia,
      sigla: data.sigla,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Asignar usuario solo si viene user_id
    if (data.user_id) {
      const user = await userRepository.findOneBy({ id: data.user_id });
      if (!user) throw new Error("Usuario no encontrado");
      entidadAdd.user = user;
    }
    // Si no hay user_id, no se asigna ningún usuario

    const nuevaEntidad = entidadesRepository.create(entidadAdd);
    return await entidadesRepository.save(nuevaEntidad);
  } catch (error) {
    console.error("❌ Error al crear entidad:", error);
    throw error;
  }
};

export const updateEntidad = async (id, data) => {
  const entidad = await entidadesRepository.findOne({
    where: { id },
    relations: ["user"],
  });
  if (!entidad) throw new Error("Entidad no encontrada");

  entidadesRepository.merge(entidad, data);
  entidad.updated_at = new Date();

  // Asignar usuario si se pasa user_id
  if (data.user_id) {
    const user = await userRepository.findOneBy({ id: data.user_id });
    if (!user) throw new Error("Usuario no encontrado");
    entidad.user = user;
  }

  return await entidadesRepository.save(entidad);
};

export const deleteEntidad = async (id) => {
  const entidad = await entidadesRepository.findOneBy({ id });
  if (!entidad) throw new Error("Entidad no encontrada");

  return await entidadesRepository.remove(entidad);
};