import { entidadesRepository } from "../repositories/entidadesRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const getAllEntidades = async () => {
  return await entidadesRepository.find();
};

export const getEntidadById = async (id) => {
  const entidad = await entidadesRepository.findOneBy({ id });
  if (!entidad) throw new Error("Entidad no encontrada");
  return entidad;
};

export const createEntidad = async (data) => {

  const userAdd = {
    nombres: data.nombres,
    apellidos: data.apellidos,
    celular: data.celular,
    password: data.password,
    cedula: data.cedula,
    email: data.email,
    tipo: "encargado",
    insertador: "SISTEMA",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const userCreate = userRepository.create(userAdd);
  
  const entidadAdd = {
    facultad: data.facultad,
    carrera: data.carrera,
    materia: data.materia,
    sigla: data.sigla,
    user_id: userCreate?.id,
    created_at: new Date(),
    updated_at: new Date(),
  };
  
  const nuevaEntidad = entidadesRepository.create(data);
  return await entidadesRepository.save(nuevaEntidad);
};

export const updateEntidad = async (id, data) => {
  const entidad = await entidadesRepository.findOneBy({ id });
  if (!entidad) return null;

  entidadesRepository.merge(entidad, data);
  return await entidadesRepository.save(entidad);
};

export const deleteEntidad = async (id) => {
  const entidad = await entidadesRepository.findOneBy({ id });
  if (!entidad) return null;
  return await entidadesRepository.remove(entidad);
};
