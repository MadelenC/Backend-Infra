import { viajesRepository } from "../repositories/travelRepository.js";
import { destinoViajeRepository } from "../repositories/destino_viajeRepository.js";
import { vehicleTravelRepository } from "../repositories/vehicle_travelRepository.js";
import { userTravelRepository } from "../repositories/user_travelRepository.js";

export const getAllViajes = async () => {
  return await viajesRepository.find();
};

export const getViajeById = async (id) => {
  const viaje = await viajesRepository.findOneBy({ id });

  if (!viaje) throw new Error("Viaje no encontrado");

  return viaje;
};

/* ================================
   🔥 DEBUG CONEXIÓN
================================ */
console.log("🧠 CONEXIÓN ACTIVA:");
console.log("DB:", viajesRepository.manager.connection.options.database);
console.log("HOST:", viajesRepository.manager.connection.options.host);


export const createFullViaje = async (data) => {
  try {
    console.log("📥 DATA RECIBIDA:", data);

    
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
    console.log("🚗 VIAJE GUARDADO:", viajeGuardado);

   
    if (Array.isArray(data.destinos)) {
      for (const d of data.destinos) {
        try {
          const result = await destinoViajeRepository.save({
            viaje: viajeGuardado,
            destino: { id: d.id || d.destino_id },
            created_at: new Date(),
            updated_at: new Date(),
          });

          console.log("✅ DESTINO INSERTADO:", result);
        } catch (err) {
          console.error("❌ ERROR DESTINO:", err);
        }
      }
    }

    
    if (Array.isArray(data.vehiculos)) {
      for (const v of data.vehiculos) {
        try {
          const result = await vehicleTravelRepository.save({
            viaje: viajeGuardado,
            vehiculo: { id: v.id },
          });

          console.log("✅ VEHICULO INSERTADO:", result);
        } catch (err) {
          console.error("❌ ERROR VEHICULO:", err);
        }
      }
    }

    
    if (Array.isArray(data.usuarios)) {
      for (const u of data.usuarios) {
        try {
          const result = await userTravelRepository.save({
            viaje: viajeGuardado,
            user: { id: u.id },
          });

          console.log("✅ USUARIO INSERTADO:", result);
        } catch (err) {
          console.error("❌ ERROR USUARIO:", err);
        }
      }
    }

    console.log("🎉 VIAJE COMPLETO FINALIZADO");
    return viajeGuardado;

  } catch (error) {
    console.error("❌ ERROR GENERAL:", error);
    throw new Error("No se pudo crear el viaje completo");
  }
};


export const updateFullViaje = async (id, data) => {
  const viaje = await viajesRepository.findOneBy({ id });

  if (!viaje) throw new Error("Viaje no encontrado");

  viajesRepository.merge(viaje, {
    ...data,
    updated_at: new Date(),
  });

  return await viajesRepository.save(viaje);
};


export const deleteFullViaje = async (id) => {
  const viaje = await viajesRepository.findOneBy({ id });

  if (!viaje) throw new Error("Viaje no encontrado");

  await destinoViajeRepository.delete({ viaje: { id } });
  await vehicleTravelRepository.delete({ viaje: { id } });
  await userTravelRepository.delete({ viaje: { id } });

  return await viajesRepository.remove(viaje);
};