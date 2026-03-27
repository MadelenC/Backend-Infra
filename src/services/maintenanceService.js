import { maintenanceRepository } from "../repositories/maintenanceRepository.js";

// Obtener todos
export const getAllMaintenances = async () => {
  return await maintenanceRepository.find({
    relations: ["user", "institucion"], 
  });
};

// Obtener por ID
export const getMaintenanceById = async (id) => {
  const maintenance = await maintenanceRepository.findOne({
    where: { id },
    relations: ["user", "institucion"], 
  });

  if (!maintenance) throw new Error("Mantenimiento no encontrado");
  return maintenance;
};

// Crear
export const createMaintenance = async (data) => {
  const nuevo = maintenanceRepository.create({
    equipo: data.equipo,
    marca: data.marca,
    modelo: data.modelo,
    numero: data.numero,
    codigo: data.codigo,
    otros: data.otros,
    encar: data.encar,
    taller: data.taller,
    descripcion: data.descripcion,
    aprobacion: data.aprobacion,
    fecha: data.fecha,
    fecha_inicio: data.fecha_inicio,
    fecha_final: data.fecha_final,
    responsable: data.responsable,
    informe: data.informe,
    cumplido: data.cumplido,
    id_nro: data.id_nro,

    // relaciones (IMPORTANTE)
    user: data.user_id ? { id: data.user_id } : null,
    institucion: data.institucion_id ? { id: data.institucion_id } : null,
  });

  return await maintenanceRepository.save(nuevo);
};

// Actualizar
export const updateMaintenance = async (id, data) => {
  const maintenance = await maintenanceRepository.findOneBy({ id });
  if (!maintenance) throw new Error("Mantenimiento no encontrado");

  maintenanceRepository.merge(maintenance, { ...data,

    user: data.user_id ? { id: data.user_id } : maintenance.user,
    institucion: data.institucion_id
      ? { id: data.institucion_id }
      : maintenance.institucion,
  });

  return await maintenanceRepository.save(maintenance);
};

export const deleteMaintenance = async (id) => {
  const maintenance = await maintenanceRepository.findOneBy({ id });
  if (!maintenance) throw new Error("Mantenimiento no encontrado");

  return await maintenanceRepository.remove(maintenance);
};