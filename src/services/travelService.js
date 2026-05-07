import { viajesRepository } from "../repositories/travelRepository.js";
import { destinoViajeRepository } from "../repositories/destino_viajeRepository.js";
import { vehicleTravelRepository } from "../repositories/vehicle_travelRepository.js";
import { userTravelRepository } from "../repositories/user_travelRepository.js";
import { rutasRepository } from "../repositories/routesRepository.js";


export const getAllViajes = async ({ page, limit }) => {
  const query = viajesRepository
    .createQueryBuilder("v")
    .leftJoinAndSelect("v.presupuestos", "presupuestos")
    .leftJoinAndSelect("v.rutas", "rutas")
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
    dep_inicio: d.destino.dep_inicio,
    origen: d.destino.origen,
    destino: d.destino.destino,
    dep_final: d.destino.dep_final,
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

        destino_id: r.destino_id,
        kilome: r.kilome,

        dest1: r.dest1,
        k1: r.k1,

        dest2: r.dest2,
        k2: r.k2,

        dest3: r.dest3,
        k3: r.k3,

        dest4: r.dest4,
        k4: r.k4,

        dest5: r.dest5,
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


    await rutasRepository.save({
  viaje: viajeGuardado,

 
  destino_id: data.destinos[0]?.id || null,
  kilome: Number(data.destinos[0]?.km || 0),

  dest1: data.destinos[1]?.id || null,
  k1: Number(data.destinos[1]?.km || 0),

  dest2: data.destinos[2]?.id || null,
  k2: Number(data.destinos[2]?.km || 0),

  dest3: data.destinos[3]?.id || null,
  k3: Number(data.destinos[3]?.km || 0),

  dest4: data.destinos[4]?.id || null,
  k4: Number(data.destinos[4]?.km || 0),

  dest5: data.destinos[5]?.id || null,
  k5: Number(data.destinos[5]?.km || 0),

  adicional: Number(data.kmAdicional || 0),

  total: Number(data.kmTotal || 0),

  created_at: new Date(),
  updated_at: new Date(),
});

   
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

  const viaje = await viajesRepository.findOne({
    where: { id }
  });

  if (!viaje) {
    throw new Error("Viaje no encontrado");
  }

  // =========================
  // ACTUALIZAR DATOS PRINCIPALES
  // =========================

  viajesRepository.merge(viaje, {
    tipo: data.tipo,
    entidad: data.entidad,
    objetivo: data.objetivo,
    dias: data.dias,
    pasajeros: data.pasajeros,
    fecha_inicial: data.fecha_inicial,
    fecha_final: data.fecha_final,
    updated_at: new Date(),
  });

  await viajesRepository.save(viaje);

  // =========================
  // ELIMINAR RELACIONES ANTIGUAS
  // =========================

  await destinoViajeRepository.delete({
    viaje: { id }
  });

  await vehicleTravelRepository.delete({
    viaje: { id }
  });

  await userTravelRepository.delete({
    viaje: { id }
  });

  await rutasRepository.delete({
    viaje: { id }
  });

  // =========================
  // INSERTAR NUEVOS DESTINOS
  // =========================

  if (Array.isArray(data.destinos)) {

    for (const d of data.destinos) {

      await destinoViajeRepository.save({
        viaje: viaje,
        destino: {
          id: d.id
        },
        created_at: new Date(),
        updated_at: new Date(),
      });

    }

  }

  // =========================
  // INSERTAR VEHICULOS
  // =========================

  if (Array.isArray(data.vehiculos)) {

    for (const v of data.vehiculos) {

      await vehicleTravelRepository.save({
        viaje: viaje,
        vehiculo: {
          id: v.id
        }
      });

    }

  }

  // =========================
  // INSERTAR USUARIOS
  // =========================

  if (Array.isArray(data.usuarios)) {

    for (const u of data.usuarios) {

      await userTravelRepository.save({
        viaje: viaje,
        user: {
          id: u.id
        }
      });

    }

  }

  // =========================
  // INSERTAR RUTAS
  // =========================

  await rutasRepository.save({

    viaje: viaje,

    destino_id: data.destinos[0]?.id || null,
    kilome: Number(data.destinos[0]?.km || 0),

    dest1: data.destinos[1]?.id || null,
    k1: Number(data.destinos[1]?.km || 0),

    dest2: data.destinos[2]?.id || null,
    k2: Number(data.destinos[2]?.km || 0),

    dest3: data.destinos[3]?.id || null,
    k3: Number(data.destinos[3]?.km || 0),

    dest4: data.destinos[4]?.id || null,
    k4: Number(data.destinos[4]?.km || 0),

    dest5: data.destinos[5]?.id || null,
    k5: Number(data.destinos[5]?.km || 0),

    adicional: Number(data.kmAdicional || 0),

    total: Number(data.kmTotal || 0),

    created_at: new Date(),
    updated_at: new Date(),
  });

  return viaje;
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