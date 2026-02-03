import { modelosRepository } from "../repositories/modelsRepository.js"; 

// Traer todos los modelos
export const getAllModelos = async () => {
  return await modelosRepository.find();
};

// Traer un modelo por ID
export const getModeloById = async (id) => {
  const modelo = await modelosRepository.findOneBy({ id });
  if (!modelo) throw new Error("Modelo no encontrado");
  return modelo;
};

// Crear un nuevo modelo
export const createModelo = async (data) => {
  const modeloData = {
    modelo: data.modelo,
    tipoe: data.tipoe,
    kilometraje: data.kilometraje,
    vehiculo_id: data.vehiculo_id, 
    created_at: new Date(),
    updated_at: new Date(),
  };

  const newModelo = modelosRepository.create(modeloData);
  return await modelosRepository.save(newModelo);
};

// Actualizar un modelo existente
export const updateModelo = async (id, data) => {
  const modelo = await modelosRepository.findOneBy({ id });
  if (!modelo) throw new Error("Modelo no encontrado");

  modelosRepository.merge(modelo, {
    modelo: data.modelo,
    tipoe: data.tipoe,
    kilometraje: data.kilometraje,
    vehiculo_id: data.vehiculo_id,
    updated_at: new Date(),
  });

  return await modelosRepository.save(modelo);
};

// Eliminar un modelo
export const deleteModelo = async (id) => {
  const modelo = await modelosRepository.findOneBy({ id });
  if (!modelo) throw new Error("Modelo no encontrado");

  return await modelosRepository.remove(modelo);
};
