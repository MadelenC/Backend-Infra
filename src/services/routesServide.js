import { rutasRepository } from "../repositories/routesRepository.js";

// Obtener todos los registros de rutas con viaje
export const getAllRutas = async () => {
  return await rutasRepository.find({
    relations: ["viaje"],
  });
};

// Obtener ruta por ID con viaje
export const getRutaById = async (id) => {
  const ruta = await rutasRepository.findOne({
    where: { id },
    relations: ["viaje"],
  });

  if (!ruta) throw new Error("Ruta no encontrada");
  return ruta;
};


export const createRuta = async (data) => {
  const nueva = rutasRepository.create({

    // primer destino
    destino_id: data.destino_id,
    kilome: data.kilome,

    // segundo
    dest1: data.dest1,
    k1: data.k1,

    // tercero
    dest2: data.dest2,
    k2: data.k2,

    // cuarto
    dest3: data.dest3,
    k3: data.k3,

    // quinto
    dest4: data.dest4,
    k4: data.k4,

    // sexto
    dest5: data.dest5,
    k5: data.k5,

    adicional: data.adicional,
    total: data.total,

    viaje: data.viaje_id
      ? { id: data.viaje_id }
      : null,

    created_at: new Date(),
    updated_at: new Date(),
  });

  return await rutasRepository.save(nueva);
};

// Actualizar ruta existente
export const updateRuta = async (id, data) => {
  const ruta = await rutasRepository.findOne({
    where: { id },
    relations: ["viaje"],
  });

  if (!ruta) throw new Error("Ruta no encontrada");

  rutasRepository.merge(ruta, {
    ...data,
    viaje: data.viaje_id ? { id: data.viaje_id } : ruta.viaje,
  });

  return await rutasRepository.save(ruta);
};

// Eliminar ruta
export const deleteRuta = async (id) => {
  const ruta = await rutasRepository.findOneBy({ id });

  if (!ruta) throw new Error("Ruta no encontrada");

  return await rutasRepository.remove(ruta);
};