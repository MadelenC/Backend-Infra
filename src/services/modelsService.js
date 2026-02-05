import { modelosRepository } from "../repositories/modelsRepository.js";
import { vehicleRepository } from "../repositories/vehicleRepository.js";

// Traer todos los modelos (CON vehículo)
export const getAllModelos = async () => {
  return await modelosRepository.find({
    relations: ["vehiculo"],
  });
};

// Traer un modelo por ID
export const getModeloById = async (id) => {
  const modelo = await modelosRepository.findOne({
    where: { id },
    relations: ["vehiculo"],
  });

  if (!modelo) throw new Error("Modelo no encontrado");
  return modelo;
};

// Crear un nuevo modelo
export const createModelo = async (data) => {
  // 1️⃣ buscar el vehículo
  const vehiculo = await vehicleRepository.findOneBy({
    id: data.vehiculo_id,
  });

  if (!vehiculo) {
    throw new Error("Vehículo no existe");
  }

  // 2️⃣ crear el modelo con la RELACIÓN
  const newModelo = modelosRepository.create({
    modelo: data.modelo,
    tipoe: data.tipoe,
    kilometraje: data.kilometraje,
    vehiculo: vehiculo, // 👈 ESTA ES LA CLAVE
    created_at: new Date(),
    updated_at: new Date(),
  });

  return await modelosRepository.save(newModelo);
};

// Actualizar un modelo existente
export const updateModelo = async (id, data) => {
  const modelo = await modelosRepository.findOne({
    where: { id },
    relations: ["vehiculo"],
  });

  if (!modelo) throw new Error("Modelo no encontrado");

  if (data.vehiculo_id) {
    const vehiculo = await vehicleRepository.findOneBy({
      id: data.vehiculo_id,
    });

    if (!vehiculo) {
      throw new Error("Vehículo no existe");
    }

    modelo.vehiculo = vehiculo;
  }

  modelo.modelo = data.modelo ?? modelo.modelo;
  modelo.tipoe = data.tipoe ?? modelo.tipoe;
  modelo.kilometraje = data.kilometraje ?? modelo.kilometraje;
  modelo.updated_at = new Date();

  return await modelosRepository.save(modelo);
};

// Eliminar un modelo
export const deleteModelo = async (id) => {
  const modelo = await modelosRepository.findOneBy({ id });
  if (!modelo) throw new Error("Modelo no encontrado");

  return await modelosRepository.remove(modelo);
};

