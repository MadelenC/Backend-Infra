import { reservasRepository } from "../repositories/reservasRepository.js";
import { userRepository } from "../repositories/userRepository.js";

// Obtener todas las reservas
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

// Obtener reserva por ID
export const getReservaById = async (id) => {
  const reserva = await reservasRepository.findOne({
    where: { id: Number(id) },
    relations: {
      user: true,
      viajes: true,
    },
  });

  if (!reserva) throw new Error("Reserva no encontrada");
  return reserva;
};

// Crear nueva reserva
export const createReserva = async (data) => {
  try {
    // 🔹 Buscar usuario correctamente desde data
    const user = await userRepository.findOne({
      where: { id: Number(data.user_id) },
    });

    if (!user) throw new Error("Usuario no encontrado");

    // 🔹 Convertir fechas a Date
    const fechaInicio = new Date(data.fecha_inicial);
    const fechaFin = new Date(data.fecha_final);

    // 🚨 Validar fechas
    if (fechaFin < fechaInicio) throw new Error("La fecha final no puede ser menor que la inicial");

    // 📅 Calcular días
    let dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    if (dias <= 0) dias = 1;

    // 🔹 Convertir pasajeros a string si tu entidad lo requiere
    const pasajeros = String(data.pasajeros);

    const nuevaReserva = reservasRepository.create({
      entidad: data.entidad,
      objetivo: data.objetivo,
      pasajeros,
      fecha_inicial: data.fecha_inicial,
      fecha_final: data.fecha_final,
      dias: String(dias),
      user: user,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await reservasRepository.save(nuevaReserva);
  } catch (error) {
    console.error("Error al crear reserva:", error.message);
    throw new Error(error.message);
  }
};

// Actualizar reserva
export const updateReserva = async (id, data) => {
  try {
    const reserva = await reservasRepository.findOne({ where: { id: Number(id) } });
    if (!reserva) throw new Error("Reserva no encontrada");

    // Actualizar fechas si vienen en el payload
    if (data.fecha_inicial && data.fecha_final) {
      const fechaInicio = new Date(data.fecha_inicial);
      const fechaFin = new Date(data.fecha_final);
      let dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
      if (dias <= 0) dias = 1;
      data.dias = String(dias);
    }

    // 🔹 Asegurar que pasajeros sea string
    if (data.pasajeros !== undefined) data.pasajeros = String(data.pasajeros);

    reservasRepository.merge(reserva, data);
    return await reservasRepository.save(reserva);
  } catch (error) {
    console.error(`Error al actualizar reserva ID ${id}:`, error.message);
    throw new Error(error.message);
  }
};

// Eliminar reserva
export const deleteReserva = async (id) => {
  try {
    const reserva = await reservasRepository.findOne({
      where: { id: Number(id) },
    });

    if (!reserva) throw new Error("Reserva no encontrada");

    await reservasRepository.remove(reserva);
    return { message: "Reserva eliminada correctamente" };
  } catch (error) {
    console.error(`Error al eliminar reserva ID ${id}:`, error.message);
    throw new Error(error.message);
  }
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