import { tripReportRepository } from "../repositories/tripReportRepository.js";

/* =========================
   GET ALL
========================= */
export const getAllTripReports = async () => {
  return await tripReportRepository.find();
};

/* =========================
   GET BY ID
========================= */
export const getTripReportById = async (id) => {
  const report = await tripReportRepository.findOneBy({ id });

  if (!report) {
    throw new Error("Informe de viaje no encontrado");
  }

  return report;
};

/* =========================
   CREATE
========================= */
export const createTripReport = async (data) => {
  const nuevo = tripReportRepository.create({
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
    combustotalco: data.combustotalco,

    descripe: data.descripe,
    montope: data.montope,
    montoim: data.montoim,
    totalpeim: data.totalpeim,

    delegacion: data.delegacion,
    descripmante: data.descripmante,
    recomendacion: data.recomendacion,
  });

  return await tripReportRepository.save(nuevo);
};

/* =========================
   UPDATE
========================= */
export const updateTripReport = async (id, data) => {
  const report = await tripReportRepository.findOneBy({ id });

  if (!report) {
    throw new Error("Informe de viaje no encontrado");
  }

  tripReportRepository.merge(report, data);
  return await tripReportRepository.save(report);
};

/* =========================
   DELETE
========================= */
export const deleteTripReport = async (id) => {
  const report = await tripReportRepository.findOneBy({ id });

  if (!report) {
    throw new Error("Informe de viaje no encontrado");
  }

  return await tripReportRepository.remove(report);
};