import { reservasRepository } from "../repositories/reservasRepository.js";
import { userRepository } from "../repositories/userRepository.js";


export const getAllReservas = async () => {
  return await reservasRepository.find({
    relations: {
      user: true,
      viajes: true,
    },
    order: {
      id: "DESC",
    },
  });
};


export const getReservaById = async (id) => {
  const reserva = await reservasRepository.findOne({
    where: { id: Number(id) },
    relations: {
      user: true,
      viajes: true,
    },
  });

  if (!reserva) {
    throw new Error("Reserva no encontrada");
  }

  return reserva;
};


export const createReserva = async (data, userId) => {
  const user = await userRepository.findOne({
    where: { id: Number(userId) },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const nuevaReserva = reservasRepository.create({
    entidad: data.entidad,
    objetivo: data.objetivo,
    pasajeros: data.pasajeros,
    fecha_inicial: data.fecha_inicial,
    fecha_final: data.fecha_final,
    dias: data.dias,
    user: user,
  });

  return await reservasRepository.save(nuevaReserva);
};


export const updateReserva = async (id, data) => {
  const reserva = await reservasRepository.findOne({
    where: { id: Number(id) },
  });

  if (!reserva) {
    throw new Error("Reserva no encontrada");
  }

  reservasRepository.merge(reserva, data);

  return await reservasRepository.save(reserva);
};


export const deleteReserva = async (id) => {
  const reserva = await reservasRepository.findOne({
    where: { id: Number(id) },
  });

  if (!reserva) {
    throw new Error("Reserva no encontrada");
  }

  await reservasRepository.remove(reserva);

  return { message: "Reserva eliminada correctamente" };
};

// Obtener reservas por usuario
export const getReservasByUser = async (userId) => {
  return await reservasRepository.find({
    where: {
      user: {
        id: Number(userId),
      },
    },
    relations: {
      user: true,
      viajes: true,
    },
    order: {
      id: "DESC",
    },
  });
};