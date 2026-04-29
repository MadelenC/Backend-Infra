import { applicationRepository } from "../repositories/applicationRepository.js";
import { vehicleRepository } from "../repositories/vehicleRepository.js";
import { accessoriesRepository } from "../repositories/accessoriesRepository.js";
export const getAllApplications = async () => {
  return await applicationRepository.find({
    relations: ["vehiculo","accesorios"],
  });
};

export const getApplicationById = async (id) => {
  const application = await applicationRepository.findOne({
    where: { id },
    relations: ["vehiculo","accesorios"],
  });

  if (!application) throw new Error("Solicitud no encontrada");
  return application;
};

export const createApplication = async (data) => {
  try {
    console.log("DATA RECIBIDA:", data);

    const vehiculo = await vehicleRepository.findOneBy({
      id: data.vehiculo_id,
    });

    if (!vehiculo) throw new Error("Vehículo no encontrado");

    // 1. Crear solicitud
    const nueva = applicationRepository.create({
      chofer: data.chofer,
      descripsoli: data.descripsoli,
      fecha: data.fecha,
      vehiculo,
    });

    const saved = await applicationRepository.save(nueva);

    // 2. MULTI ACCESORIOS (🔥 aquí está el cambio)
    if (Array.isArray(data.accesorio_ids)) {
      for (const id of data.accesorio_ids) {
        const accesorio = await accessoriesRepository.findOneBy({ id });

        if (!accesorio) continue;

        accesorio.solicitud = saved;
        await accessoriesRepository.save(accesorio);
      }
    }

    return saved;

  } catch (error) {
    console.error("🔥 ERROR EN CREATE APPLICATION:", error);
    throw error;
  }
};
export const updateApplication = async (id, data) => {
  const application = await applicationRepository.findOne({
    where: { id },
    relations: ["vehiculo", "accesorios"],
  });

  if (!application) throw new Error("Solicitud no encontrada");

  // vehículo
  if (data.vehiculo_id) {
    const vehiculo = await vehicleRepository.findOneBy({
      id: data.vehiculo_id,
    });

    if (!vehiculo) throw new Error("Vehículo no encontrado");

    application.vehiculo = vehiculo;
  }

  // 🔥 accesorios múltiples
  if (Array.isArray(data.accesorio_ids)) {
    for (const idAcc of data.accesorio_ids) {
      const accesorio = await accessoriesRepository.findOneBy({ id: idAcc });

      if (!accesorio) continue;

      accesorio.solicitud = application;
      await accessoriesRepository.save(accesorio);
    }
  }

  application.chofer = data.chofer ?? application.chofer;
  application.descripsoli = data.descripsoli ?? application.descripsoli;
  application.fecha = data.fecha ?? application.fecha;

  return await applicationRepository.save(application);
};
export const deleteApplication = async (id) => {
  const application = await applicationRepository.findOneBy({ id });

  if (!application) throw new Error("Solicitud no encontrada");

  return await applicationRepository.remove(application);
};