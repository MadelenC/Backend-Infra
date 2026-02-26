import { reservasRepository } from "../repositories/reservasRepository.js";
import { userRepository } from "../repositories/userRepository.js"; 
// Obtener todas las reservas (opcional: con usuario)
export const getAllReservas = async () => {
  return await reservasRepository.find({ relations: ["user"] });
};

// Obtener reserva por ID
export const getReservaById = async (id) => {
  const reserva = await reservasRepository.findOne({
    where: { id },
    relations: ["user"],
  });
  if (!reserva) throw new Error("Reserva no encontrada");
  return reserva;
};

// Crear nueva reserva asociada a un usuario
export const createReserva = async (data, userId) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("Usuario no encontrado");

  const nueva = reservasRepository.create({
    entidad: data.entidad,
    objetivo: data.objetivo,
    pasajeros: data.pasajeros,
    fecha_inicial: data.fecha_inicial,
    fecha_final: data.fecha_final,
    dias: data.dias,
    user, // asociamos el usuario
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

// Obtener todas las reservas de un usuario
export const getReservasByUser = async (userId) => {
  return await reservasRepository.find({
    where: { user: { id: userId } },
    relations: ["user"],
  });
};