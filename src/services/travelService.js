import { viajesRepository } from "../repositories/travelRepository.js"; 

// Obtener todos los viajes
export const getAllViajes = async () => {
  return await viajesRepository.find();
};

// Obtener viaje por ID
export const getViajeById = async (id) => {
  const viaje = await viajesRepository.findOneBy({ id });
  if (!viaje) throw new Error("Viaje no encontrado");
  return viaje;
};

// Crear nuevo viaje
export const createViaje = async (data) => {
  const nuevo = viajesRepository.create({
    entidad: data.entidad,
    objetivo: data.objetivo,
    dias: data.dias,
    pasajeros: data.pasajeros,
    fecha_inicial: data.fecha_inicial,
    fecha_final: data.fecha_final,
    estado: data.estado,
  });

  return await viajesRepository.save(nuevo);
};

// Actualizar viaje existente
export const updateViaje = async (id, data) => {
  const viaje = await viajesRepository.findOneBy({ id });
  if (!viaje) throw new Error("Viaje no encontrado");

  viajesRepository.merge(viaje, data);
  return await viajesRepository.save(viaje);
};

// Eliminar viaje
export const deleteViaje = async (id) => {
  const viaje = await viajesRepository.findOneBy({ id });
  if (!viaje) throw new Error("Viaje no encontrado");

  return await viajesRepository.remove(viaje);
};