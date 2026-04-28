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

    const accesorio = await accessoriesRepository.findOneBy({
      id: data.accesorio_id,
    });

    if (!accesorio) throw new Error("Accesorio no encontrado");

    const nueva = applicationRepository.create({
      chofer: data.chofer,
      descripsoli: data.descripsoli,
      fecha: data.fecha,
      vehiculo,
      accesorios: [accesorio],
    });

    return await applicationRepository.save(nueva);

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

  if (data.vehiculo_id) {
    const vehiculo = await vehicleRepository.findOneBy({
      id: data.vehiculo_id,
    });

    if (!vehiculo) throw new Error("Vehículo no encontrado");

    application.vehiculo = vehiculo;
  }

  if (data.accesorio_id) {
    const accesorio = await accesoriesRepository.findOneBy({
      id: data.accesorio_id,
    });

    if (!accesorio) throw new Error("Accesorio no encontrado");

    application.accesorios = [accesorio];
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