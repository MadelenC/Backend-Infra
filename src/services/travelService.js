import { viajesRepository } from "../repositories/travelRepository.js";
import { destinoViajeRepository } from "../repositories/destino_viajeRepository.js";
import { vehicleTravelRepository } from "../repositories/vehicle_travelRepository.js";
import { userTravelRepository } from "../repositories/user_travelRepository.js";
import { rutasRepository } from "../repositories/routesRepository.js";


export const getAllViajes = async ({ page, limit }) => {
  const query = viajesRepository
    .createQueryBuilder("v")
    .leftJoinAndSelect("v.presupuestos", "presupuestos")
    .orderBy("v.id", "DESC")
    .skip((page - 1) * limit)
    .take(limit);

  const [data, total] = await query.getManyAndCount();

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getViajeById = async (id) => {


  const viaje = await viajesRepository.findOne({
    where: { id },
    relations: ["reserva", "presupuestos","rutas"],
  });

  if (!viaje) throw new Error("Viaje no encontrado");

  const [destinos, vehiculos, usuarios,rutas] = await Promise.all([
    destinoViajeRepository.find({
      where: { viaje: { id } },
      relations: ["destino"],
    }),

    vehicleTravelRepository.find({
      where: { viaje: { id } },
      relations: ["vehiculo"],
    }),

    userTravelRepository.find({
      where: { viaje: { id } },
      relations: ["user"],
    }),
     rutasRepository.find({
    where: { viaje: { id } },
  }),
  ]);

  const reserva = viaje.reserva;

  return {
  id: viaje.id,
  tipo: viaje.tipo,
  estado: viaje.estado,

 
  entidad: viaje.entidad,
  objetivo: viaje.objetivo,
  pasajeros: viaje.pasajeros,
  dias: viaje.dias,
  fecha_inicial: viaje.fecha_inicial,
  fecha_final: viaje.fecha_final,

  // relaciones
  destinos: destinos.map(d => ({
    id: d.destino.id,
    origen: d.destino.origen,
    destino: d.destino.destino,
    ruta: d.destino.ruta,
    kilometraje: d.destino.kilometraje,
  })),

  vehiculos: vehiculos.map(v => ({
    id: v.vehiculo.id,
    tipo: v.vehiculo.tipog,
    placa: v.vehiculo.placa,
  })),

  choferes: usuarios
    .filter(u => u.user.tipo === "chofer")
    .map(u => ({
      id: u.user.id,
      nombres: u.user.nombres,
      apellidos: u.user.apellidos,
      celular: u.user.celular,
    })),

  encargados: usuarios
    .filter(u => u.user.tipo === "encargado")
    .map(u => ({
      id: u.user.id,
      nombres: u.user.nombres,
      apellidos: u.user.apellidos,
      celular: u.user.celular,
    })),

    rutas: rutas.map(r => ({
  id: r.id,
  kilome: r.kilome,
  k1: r.k1,
  k2: r.k2,
  k3: r.k3,
  k4: r.k4,
  k5: r.k5,
  adicional: r.adicional,
  total: r.total,
})),
};
};


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
   await rutasRepository.delete({ viaje: { id } });
  return await viajesRepository.remove(viaje);
};