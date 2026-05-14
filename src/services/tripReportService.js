import { infoviajeRepository } from "../repositories/infoviajeRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { vehicleRepository } from "../repositories/vehicleRepository.js";
import { tripReportRepository } from "../repositories/tripReportRepository.js";
import { viajesRepository } from "../repositories/travelRepository.js";
import { kilomeinformesRepository } from "../repositories/kilomeinformesRepository.js";
import { modelosRepository } from "../repositories/modelsRepository.js";

const toNumber = (v) => Number(v || 0);

export const getAllTripReports = async ({
  page = 1,
  limit = 8,
  search = "",
}) => {
  const query = tripReportRepository
    .createQueryBuilder("t")
     .leftJoinAndSelect("t.kilomeinformes", "km")
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
    const vehiculo = vehicles.find(
      (v) => Number(v.id) === Number(t.vehiculo)
    );

    const chofer = users.find(
      (u) => Number(u.id) === Number(t.chofer)
    );

    const encargado = users.find(
      (u) => Number(u.id) === Number(t.encargado)
    );

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
  console.log("🔥 INICIO createFullTripReport");
  console.log("DATA:", data);
  console.log("VIAJE ID:", data.viaje, typeof data.viaje);

  const travel = await viajesRepository.findOneBy({
    id: Number(data.viaje),
  });

  if (!travel) {
    throw new Error("Viaje no encontrado");
  }

  // 🧠 ENTITY COMPLETO Y SEGURO
  const informe = tripReportRepository.create({
    vehiculo: data.vehiculo,
    chofer: data.chofer,
    encargado: data.encargado,
    entidad: data.entidad,

    fechapartida: data.fechapartida,
    tiempopartida: data.tiempopartida,
    kilopartida: toNumber(data.kilopartida),

    fechallegada: data.fechallegada,
    tiempollegada: data.tiempollegada,
    kilollegada: toNumber(data.kilollegada),

    kmtotal: toNumber(data.kmtotal),

    viaticoa: toNumber(data.viaticoa),
    viaticob: toNumber(data.viaticob),
    viaticoc: toNumber(data.viaticoc),

    pasajeros: toNumber(data.pasajeros),
    dias: toNumber(data.dias),

    recargue1: toNumber(data.recargue1),
    compra1: toNumber(data.compra1),
    recargue2: toNumber(data.recargue2),
    compra2: toNumber(data.compra2),
    recargue3: toNumber(data.recargue3),
    compra3: toNumber(data.compra3),

    combustotalco: toNumber(data.combustotalco),
    combustotalu: toNumber(data.combustotalu),

    descripe: data.descripe || "",

    // 🔥 AQUÍ ESTABA EL BUG
    montope: toNumber(data.montope),
    montoim: toNumber(data.montoim),
    totalpeim: toNumber(data.totalpeim),

    combus: toNumber(data.combus),
    peaje: toNumber(data.peaje),
    impre: toNumber(data.impre),
    totalcopeim: toNumber(data.totalcopeim),

    delegacion: data.delegacion || "",
    descripmante: data.descripmante || "",
    recomendacion: data.recomendacion || "",

    created_at: new Date(),
    updated_at: new Date(),
  });

  // guardar informe
  const savedInforme = await tripReportRepository.save(informe);

  // relación intermedia
  const infoviaje = infoviajeRepository.create({
    viaje: travel,
    informe: savedInforme,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await infoviajeRepository.save(infoviaje);

  // 🔥 CALCULOS KILOMETRAJE

const kmPartida = toNumber(data.kilopartida);

// lo que recorrió el chofer
const kmRecorrido = toNumber(data.kilollegada);

// nuevo kilometraje total del vehículo
const kmTotal = kmPartida + kmRecorrido;


// 🔥 REGISTRAR EN KILOMEINFORMES

const nuevoKmInforme = kilomeinformesRepository.create({

  hay: kmPartida,

  // kilómetros recorridos
  aumento: kmRecorrido,

  // nuevo total
  total: kmTotal,

  informeviaje: {
    id: savedInforme.id,
  },

  vehiculo: {
    id: data.vehiculo,
  },
  created_at: new Date(),
    updated_at: new Date(),

});

await kilomeinformesRepository.save(nuevoKmInforme);


//ACTUALIZAR KILOMETRAJE ACTUAL DEL VEHICULO

const vehiculoActual = await vehicleRepository.findOne({
  where: {
    id: Number(data.vehiculo),
  },
  relations: ["modelos"],
});

const modeloActual = vehiculoActual.modelos?.[0];

if (modeloActual) {

  modeloActual.kilometraje = kmTotal;

  await modelosRepository.save(modeloActual);

}

  return savedInforme;
};

export const updateTripReport = async (id, data) => {
  const report = await tripReportRepository.findOneBy({ id });

  if (!report) {
    throw new Error("Informe de viaje no encontrado");
  }

  tripReportRepository.merge(report, {
    ...data,
    montope: toNumber(data.montope),
    montoim: toNumber(data.montoim),
    totalpeim: toNumber(data.totalpeim),
  });

  return await tripReportRepository.save(report);
};

export const deleteTripReport = async (id) => {
  const report = await tripReportRepository.findOneBy({ id });

  if (!report) {
    throw new Error("Informe de viaje no encontrado");
  }

  return await tripReportRepository.remove(report);
};