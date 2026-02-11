import { marcasRepository } from "../repositories/marcsRepository.js";
import { modelosRepository } from "../repositories/modelsRepository.js";

// Traer todas las marcas (con modelo relacionado)
export const getAllMarcas = async () => {
  return await marcasRepository.find({
    relations: ["modelo"],
  });
};

// Traer una marca por ID (con modelo)
export const getMarcaById = async (id) => {
  const marca = await marcasRepository.findOne({
    where: { id },
    relations: ["modelo"],
  });

  if (!marca) throw new Error("Marca no encontrada");
  return marca;
};

// Crear una nueva marca con relación a un modelo
export const createMarca = async (data) => {
  // Buscar el modelo para la relación
  const modelo = await modelosRepository.findOneBy({
    id: data.modelo_id,
  });

  if (!modelo) {
    throw new Error("Modelo no existe");
  }

  const newMarca = marcasRepository.create({
    marca: data.marca,
    chasis: data.chasis,
    motor: data.motor,
    cilindrada: data.cilindrada,
    modelo: modelo, // relación
    created_at: new Date(),
    updated_at: new Date(),
  });

  return await marcasRepository.save(newMarca);
};

// Actualizar marca existente
export const updateMarca = async (id, data) => {
  const marca = await marcasRepository.findOne({
    where: { id },
    relations: ["modelo"],
  });

  if (!marca) throw new Error("Marca no encontrada");

  if (data.modelo_id) {
    const modelo = await modelosRepository.findOneBy({
      id: data.modelo_id,
    });

    if (!modelo) {
      throw new Error("Modelo no existe");
    }

    marca.modelo = modelo;
  }

  marca.marca = data.marca ?? marca.marca;
  marca.chasis = data.chasis ?? marca.chasis;
  marca.motor = data.motor ?? marca.motor;
  marca.cilindrada = data.cilindrada ?? marca.cilindrada;
  marca.updated_at = new Date();

  return await marcasRepository.save(marca);
};

// Eliminar marca
export const deleteMarca = async (id) => {
  const marca = await marcasRepository.findOneBy({ id });
  if (!marca) throw new Error("Marca no encontrada");

  return await marcasRepository.remove(marca);
};
