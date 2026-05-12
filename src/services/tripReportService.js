import { infoviajeRepository } from "../repositories/infoviajeRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { vehicleRepository } from "../repositories/vehicleRepository.js";
import { tripReportRepository } from "../repositories/tripReportRepository.js";

export const getAllTripReports = async ({
  page = 1,
  limit = 8,
  search = "",
}) => {

  const query = tripReportRepository
    .createQueryBuilder("t")
    .orderBy("t.id", "DESC");

  if (search) {
    query.andWhere("t.entidad LIKE :search", {
      search: `%${search}%`,
    });
  }

  query.skip((page - 1) * limit).take(limit);

  const [trips, total] = await query.getManyAndCount();

  const users = await userRepository.find();
  const vehicles = await vehicleRepository.find();

  const data = trips.map((t) => {

    const vehiculo = vehicles.find(v => Number(v.id) === Number(t.vehiculo));
    const chofer = users.find(u => Number(u.id) === Number(t.chofer));
    const encargado = users.find(u => Number(u.id) === Number(t.encargado));

    return {
      ...t,
      vehiculo,
      chofer,
      encargado,
    };
  });

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getTripReportById = async (id) => {
  const report = await tripReportRepository.findOneBy({ id });

  if (!report) {
    throw new Error("Informe de viaje no encontrado");
  }

  return report;
};


export const createFullTripReport = async (data) => {


  const viaje = await viajeRepository.findOneBy({ id: data.viaje });
  if (!viaje) throw new Error("Viaje no encontrado");

  
  const informe = tripReportRepository.create({
    vehiculo: data.vehiculo,
    chofer: data.chofer,
    encargado: data.encargado,
    entidad: data.entidad,

    fechapartida: data.fechapartida,
    tiempopartida: data.tiempopartida,
    kilopartida: data.kilopartida,

    fechallegada: data.fechallegada,
    tiempollegada: data.tiempollegada,
    kilollegada: data.kilollegada,

    kmtotal: data.kmtotal,

    viaticoa: data.viaticoa,
    viaticob: data.viaticob,
    viaticoc: data.viaticoc,

    pasajeros: data.pasajeros,
    dias: data.dias,

    recargue1: data.recargue1,
    compra1: data.compra1,
    recargue2: data.recargue2,
    compra2: data.compra2,
    recargue3: data.recargue3,
    compra3: data.compra3,

    combustotalu: data.combustotalu,

    descripe: data.descripe,
    descripmante: data.descripmante,
    recomendacion: data.recomendacion,
    created_at: new Date(),
    updated_at: new Date(),
  });

  const savedInforme = await tripReportRepository.save(informe);

 
  const infoviaje = infoviajeRepository.create({
    viaje: viaje,
    informe: savedInforme,
  });

  await infoviajeRepository.save(infoviaje);

  return savedInforme;
};

export const updateTripReport = async (id, data) => {
  const report = await tripReportRepository.findOneBy({ id });

  if (!report) {
    throw new Error("Informe de viaje no encontrado");
  }

  tripReportRepository.merge(report, data);
  return await tripReportRepository.save(report);
};


export const deleteTripReport = async (id) => {
  const report = await tripReportRepository.findOneBy({ id });

  if (!report) {
    throw new Error("Informe de viaje no encontrado");
  }

  return await tripReportRepository.remove(report);
};