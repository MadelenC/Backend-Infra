import { departuresRepository } from "../repositories/departuresRepository.js";
import { vehicleRepository } from "../repositories/vehicleRepository.js";
import { userRepository } from "../repositories/userRepository.js";

// Traer todas las salidas con vehículo y chofer relacionados
export const getAllSalidas = async () => {
  return await departuresRepository.find({
    relations: ["vehiculo", "chofer"],
  });
};

// Traer una salida por ID con relaciones
export const getSalidaById = async (id) => {
  const salida = await departuresRepository.findOne({
    where: { id },
    relations: ["vehiculo", "chofer"],
  });

  if (!salida) throw new Error("Salida no encontrada");
  return salida;
};

// Crear una nueva salida con asignación de vehículo y chofer
export const createSalida = async (data) => {
  // Buscar vehículo
  const vehiculo = await vehicleRepository.findOneBy({ id: Number(data.vehiculo) });
  if (!vehiculo) throw new Error("Vehículo no existe");

  // Buscar chofer
  const chofer = await userRepository.findOneBy({ id: Number(data.chofer) });
  if (!chofer) throw new Error("Chofer no existe");

  // Crear salida
  const nuevaSalida = departuresRepository.create({
    lugar: data.lugar,
    motivo: data.motivo,
    responsable: data.responsable,
    hsalida: data.hsalida,       // asegurarse de que sea string en formato "HH:MM:SS"
    hllegada: data.hllegada,     // string o Date compatible con timestamp
    vehiculo: vehiculo,
    chofer: chofer,
  });

  return await departuresRepository.save(nuevaSalida);
};

// Actualizar salida existente
export const updateSalida = async (id, data) => {
  const salida = await departuresRepository.findOne({
    where: { id },
    relations: ["vehiculo", "chofer"],
  });

  if (!salida) throw new Error("Salida no encontrada");

  // Actualizar vehículo si se pasa
  if (data.vehiculo) {
    const vehiculo = await vehicleRepository.findOneBy({ id: Number(data.vehiculo) });
    if (!vehiculo) throw new Error("Vehículo no existe");
    salida.vehiculo = vehiculo;
  }

  // Actualizar chofer si se pasa
  if (data.chofer) {
    const chofer = await userRepository.findOneBy({ id: Number(data.chofer) });
    if (!chofer) throw new Error("Chofer no existe");
    salida.chofer = chofer;
  }

  // Actualizar campos opcionales
  salida.lugar = data.lugar ?? salida.lugar;
  salida.motivo = data.motivo ?? salida.motivo;
  salida.responsable = data.responsable ?? salida.responsable;
  salida.hsalida = data.hsalida ?? salida.hsalida;
  salida.hllegada = data.hllegada ?? salida.hllegada;

  return await departuresRepository.save(salida);
};

// Eliminar salida
export const deleteSalida = async (id) => {
  const salida = await departuresRepository.findOneBy({ id });
  if (!salida) throw new Error("Salida no encontrada");

  return await departuresRepository.remove(salida);
};