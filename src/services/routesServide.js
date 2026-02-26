import { rutasRepository } from "../repositories/routesRepository.js";

// Obtener todos los registros de rutas
export const getAllRutas = async () => {
  return await rutasRepository.find();
};

// Obtener ruta por ID
export const getRutaById = async (id) => {
  const ruta = await rutasRepository.findOneBy({ id });
  if (!ruta) throw new Error("Ruta no encontrada");
  return ruta;
};

// Crear nueva ruta
export const createRuta = async (data) => {
  const nueva = rutasRepository.create({
    kilome: data.kilome,
    k1: data.k1,
    k2: data.k2,
    k3: data.k3,
    k4: data.k4,
    k5: data.k5,
    adicional: data.adicional,
    total: data.total,
  });

  return await rutasRepository.save(nueva);
};

// Actualizar ruta existente
export const updateRuta = async (id, data) => {
  const ruta = await rutasRepository.findOneBy({ id });
  if (!ruta) throw new Error("Ruta no encontrada");

  rutasRepository.merge(ruta, data);
  return await rutasRepository.save(ruta);
};

// Eliminar ruta
export const deleteRuta = async (id) => {
  const ruta = await rutasRepository.findOneBy({ id });
  if (!ruta) throw new Error("Ruta no encontrada");

  return await rutasRepository.remove(ruta);
};