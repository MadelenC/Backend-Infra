import { destinoRepository } from "../repositories/destinoRepository.js";

export const getAllDestinos = async () => {
  return await destinoRepository.find();
};

export const getDestinoById = async (id) => {
  const destino = await destinoRepository.findOneBy({ id });
  if (!destino) throw new Error("Destino no encontrado");
  return destino;
};

export const createDestino = async (data) => {
  const nuevo = destinoRepository.create({
    deb_inicio: data.deb_inicio,
    origen: data.origen,
    destino: data.destino,
    dep_final: data.dep_final,
    ruta: data.ruta,
    kilometraje: data.kilometraje,
    tiempo: data.tiempo,
  });

  return await destinoRepository.save(nuevo);
};

export const updateDestino = async (id, data) => {
  const destino = await destinoRepository.findOneBy({ id });
  if (!destino) throw new Error("Destino no encontrado");

  destinoRepository.merge(destino, data);
  return await destinoRepository.save(destino);
};

export const deleteDestino = async (id) => {
  const destino = await destinoRepository.findOneBy({ id });
  if (!destino) throw new Error("Destino no encontrado");

  return await destinoRepository.remove(destino);
};

