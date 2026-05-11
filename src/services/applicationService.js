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
    console.log("DATA:", data);
    const hoy = new Date().toISOString().split("T")[0];

    const vehiculo = await vehicleRepository.findOneBy({
      id: data.vehiculo_id,
    });

    if (!vehiculo) throw new Error("Vehículo no encontrado");

    const saved = await applicationRepository.save(
      applicationRepository.create({
        chofer: vehiculo.codigo,
        descripsoli: data.descripsoli,
        fecha: hoy, 
        vehiculo,
        created_at: new Date(),
        updated_at: new Date(),
      })
    );

    //  ACCESORIOS EXISTENTES
    if (Array.isArray(data.accesorio_ids)) {
      for (const id of data.accesorio_ids) {
        const acc = await accessoriesRepository.findOneBy({ id });

        if (!acc) {
          console.log("Accesorio no existe:", id);
          continue;
        }

        await accessoriesRepository.update(id, {
          solicitud: saved,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    //para  NUEVOS ACCESORIOS
    if (Array.isArray(data.nuevos_accesorios)) {
      for (const nombre of data.nuevos_accesorios) {
        await accessoriesRepository.save(
          accessoriesRepository.create({
            solicitud1: nombre,
            solicitud: saved,
            created_at: new Date(),
             updated_at: new Date(),
          })
        );
      }
    }

    return saved;

  } catch (error) {
    console.error("🔥 ERROR CREATE APPLICATION:", error);
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


  application.chofer = vehiculo.codigo;
}


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