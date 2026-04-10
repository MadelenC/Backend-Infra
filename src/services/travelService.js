import { viajesRepository } from "../repositories/travelRepository.js";
import { destinoViajeRepository } from "../repositories/destino_viajeRepository.js";
import { vehicleTravelRepository } from "../repositories/vehicle_travelRepository.js";
import { userTravelRepository } from "../repositories/user_travelRepository.js";

// ---------------------------
// GET ALL VIAJES
// ---------------------------
export const getAllViajes = async () => {
  return await viajesRepository.find();
};

// ---------------------------
// GET VIAJE BY ID
// ---------------------------
export const getViajeById = async (id) => {
  const viaje = await viajesRepository.findOneBy({ id });

  if (!viaje) throw new Error("Viaje no encontrado");

  return viaje;
};

// ---------------------------
// CREATE FULL VIAJE
// ---------------------------
export const createFullViaje = async (data) => {
  try {
    const nuevoViaje = viajesRepository.create({
      tipo: data.tipo,
      entidad: data.entidad,
      objetivo: data.objetivo,
      dias: data.dias,
      pasajeros: data.pasajeros,
      fecha_inicial: data.fecha_inicial,
      fecha_final: data.fecha_final,
      estado: data.estado || "activo",
      created_at: new Date(),
      updated_at: new Date(),
    });

    const viajeGuardado = await viajesRepository.save(nuevoViaje);

    // ---------------- destinos ----------------
    if (Array.isArray(data.destinos)) {
      for (const d of data.destinos) {
        await destinoViajeRepository.save({
          viaje: viajeGuardado,
          destino_id: d.id || d.destino_id,
          km: d.km || null,
        });
      }
    }

    // ---------------- vehiculos ----------------
    if (Array.isArray(data.vehiculos)) {
      for (const v of data.vehiculos) {
        await vehicleTravelRepository.save({
          viaje: viajeGuardado,
          vehicle_id: v.id,
        });
      }
    }

    // ---------------- usuarios ----------------
    if (Array.isArray(data.usuarios)) {
      for (const u of data.usuarios) {
        await userTravelRepository.save({
          viaje: viajeGuardado,
          user_id: u.id,
        });
      }
    }

    return viajeGuardado;
  } catch (error) {
    console.error("Error al crear viaje completo:", error);
    throw new Error("No se pudo crear el viaje completo");
  }
};

// ---------------------------
// UPDATE FULL VIAJE
// ---------------------------
export const updateFullViaje = async (id, data) => {
  const viaje = await viajesRepository.findOneBy({ id });

  if (!viaje) throw new Error("Viaje no encontrado");

  viajesRepository.merge(viaje, {
    ...data,
    updated_at: new Date(),
  });

  const viajeActualizado = await viajesRepository.save(viaje);

  // 🔥 IMPORTANTE:
  // Aquí NO borramos ni usamos relations porque NO existen en Viajes

  return viajeActualizado;
};

// ---------------------------
// DELETE FULL VIAJE
// ---------------------------
export const deleteFullViaje = async (id) => {
  const viaje = await viajesRepository.findOneBy({ id });

  if (!viaje) throw new Error("Viaje no encontrado");

  // eliminar relaciones manualmente
  await destinoViajeRepository.delete({ viaje: { id } });
  await vehicleTravelRepository.delete({ viaje: { id } });
  await userTravelRepository.delete({ viaje: { id } });

  return await viajesRepository.remove(viaje);
};