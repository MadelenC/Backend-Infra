import { applicationRepository } from "../repositories/applicationRepository.js";

export const getAllApplications = async () => {
  return await applicationRepository.find({
    relations: ["vehiculo","accesorios"],
  });
};

export const getApplicationById = async (id) => {
  const application = await applicationRepository.findOne({
    where: { id },
    relations: ["vehiculo"],
  });

  if (!application) throw new Error("Solicitud no encontrada");
  return application;
};

export const createApplication = async (data) => {
  const nueva = applicationRepository.create({
    chofer: data.chofer,
    descripsoli: data.descripsoli,
    fecha: data.fecha,
    vehiculo: data.vehiculo, 
  });

  return await applicationRepository.save(nueva);
};

export const updateApplication = async (id, data) => {
  const application = await applicationRepository.findOneBy({ id });

  if (!application) throw new Error("Solicitud no encontrada");

  applicationRepository.merge(application, {
    chofer: data.chofer,
    descripsoli: data.descripsoli,
    fecha: data.fecha,
    vehiculo: data.vehiculo,
  });

  return await applicationRepository.save(application);
};

export const deleteApplication = async (id) => {
  const application = await applicationRepository.findOneBy({ id });

  if (!application) throw new Error("Solicitud no encontrada");

  return await applicationRepository.remove(application);
};