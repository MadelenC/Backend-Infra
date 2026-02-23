import { reservasRepository } from "../repositories/reservasRepository.js";

// Obtener todas las reservas
export const getAllReservas = async () => {
  return await reservasRepository.find();
};

// Obtener reserva por ID
export const getReservaById = async (id) => {
  const reserva = await reservasRepository.findOneBy({ id });
  if (!reserva) throw new Error("Reserva no encontrada");
  return reserva;
};

// Crear nueva reserva
export const createReserva = async (data) => {
  const nueva = reservasRepository.create({
    entidad: data.entidad,
    objetivo: data.objetivo,
    pasajeros: data.pasajeros,
    fecha_inicial: data.fecha_inicial,
    fecha_final: data.fecha_final,
    dias: data.dias,
  });

  return await reservasRepository.save(nueva);
};

// Actualizar reserva existente
export const updateReserva = async (id, data) => {
  const reserva = await reservasRepository.findOneBy({ id });
  if (!reserva) throw new Error("Reserva no encontrada");

  reservasRepository.merge(reserva, data);
  return await reservasRepository.save(reserva);
};

// Eliminar reserva
export const deleteReserva = async (id) => {
  const reserva = await reservasRepository.findOneBy({ id });
  if (!reserva) throw new Error("Reserva no encontrada");

  return await reservasRepository.remove(reserva);
};