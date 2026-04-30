import { reservasRepository } from "../repositories/reservasRepository.js";
import { userRepository } from "../repositories/userRepository.js";

// Obtener todas las reservas
export const getAllReservas = async ({ page, limit, estado }) => {
  const query = reservasRepository
    .createQueryBuilder("r")
    .leftJoin("r.user", "user")
    .addSelect([
      "user.id",
      "user.nombres",
      "user.apellidos",
      "user.cargo",
    ])
    .leftJoinAndSelect("r.viajes", "viajes")
    .orderBy("r.id", "DESC");

  if (estado) {
    query.andWhere("r.estado = :estado", { estado });
  }

  query.skip((page - 1) * limit).take(limit);

  const [data, total] = await query.getManyAndCount();

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
  };
};
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
   
    const user = await userRepository.findOne({
      where: { id: Number(data.user_id) },
    });

    if (!user) throw new Error("Usuario no encontrado");

   
    const fechaInicio = new Date(data.fecha_inicial);
    const fechaFin = new Date(data.fecha_final);

    if (fechaFin < fechaInicio) throw new Error("La fecha final no puede ser menor que la inicial");

   
    let dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    if (dias <= 0) dias = 1;

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

export const updateReserva = async (id, data) => {
  try {
    const reserva = await reservasRepository.findOne({ where: { id: Number(id) } });
    if (!reserva) throw new Error("Reserva no encontrada");

    if (data.fecha_inicial && data.fecha_final) {
      const fechaInicio = new Date(data.fecha_inicial);
      const fechaFin = new Date(data.fecha_final);
      let dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
      if (dias <= 0) dias = 1;
      data.dias = String(dias);
    }

  
    if (data.pasajeros !== undefined) data.pasajeros = String(data.pasajeros);

    reservasRepository.merge(reserva, data);
    return await reservasRepository.save(reserva);
  } catch (error) {
    console.error(`Error al actualizar reserva ID ${id}:`, error.message);
    throw new Error(error.message);
  }
};


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