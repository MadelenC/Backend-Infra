import { returnsRepository } from "../repositories/returnsRepository.js";

export const getAllReturns = async () => {
  return await returnsRepository.find({
    relations: ["mecanico","mecanico.solicitud", "mecanico.solicitud.vehiculo"],
  });
};

export const getReturnById = async (id) => {
  const ret = await returnsRepository.findOne({
    where: { id },
    relations: ["mecanico","mecanico.solicitud", "mecanico.solicitud.vehiculo"],
  });

  if (!ret) throw new Error("Return not found");
  return ret;
};

export const createReturn = async (data) => {
  const newReturn = returnsRepository.create({
    serial: data.serial,
    fecha: data.fecha,
    nombre: data.nombre,
    cantidad: data.cantidad,
    detalle: data.detalle,
    insertador: data.insertador,
     mecanico: { id: data.mecanico_id },
     created_at: new Date(),
    updated_at: new Date(),
  });

  return await returnsRepository.save(newReturn);
  
};

export const updateReturn = async (id, data) => {
  const ret = await returnsRepository.findOneBy({ id });
  if (!ret) throw new Error("Return not found");

  returnsRepository.merge(ret, data);
  return await returnsRepository.save(ret);
};

export const deleteReturn = async (id) => {
  const ret = await returnsRepository.findOneBy({ id });
  if (!ret) throw new Error("Return not found");

  return await returnsRepository.remove(ret);
};