
import { mechanicsRepository } from "../repositories/mechanicsRepository.js";

export const getAllMechanics = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {

  const query = mechanicsRepository
    .createQueryBuilder("m")
    .leftJoinAndSelect("m.solicitud", "solicitud" )
    .leftJoinAndSelect( "solicitud.vehiculo","vehiculo" )
    .leftJoinAndSelect( "m.devoluciones", "devoluciones" )
    .leftJoinAndSelect(  "m.kilomecanicos", "kilomecanicos");
  if (search) {
    query.andWhere(
      `
      LOWER(vehiculo.placa) LIKE LOWER(:search)
      OR LOWER(vehiculo.tipog) LIKE LOWER(:search)
      `,
      {
        search: `%${search}%`,
      }
    );
  }
  query
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy("m.id", "DESC");
  const [data, total] =
    await query.getManyAndCount();
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(
      total / limit
    ),
  };
};

export const getMechanicById = async (id) => {
  const mechanic = await mechanicsRepository.findOne({
    where: { id },
    relations: ["solicitud","solicitud.vehiculo","devoluciones", "kilomecanicos"],
  });

  if (!mechanic) throw new Error("Mechanic not found");
  return mechanic;
};


export const createMechanic = async (data) => {
  const newMechanic = mechanicsRepository.create({
    fecha: data.fecha,
    cantidad: data.cantidad,
    unidad: data.unidad,
    trabajo: data.trabajo,
    marca: data.marca,
    codigo: data.codigo,
    observacion: data.observacion,
    kilometraje: data.kilometraje,
     insertador: data.insertador,
    solicitud_id: data.solicitud_id,
    created_at: new Date(),
    updated_at: new Date(),
  });
  

  return await mechanicsRepository.save(newMechanic);
};


export const updateMechanic = async (id, data) => {
  const mechanic = await mechanicsRepository.findOneBy({ id });

  if (!mechanic) throw new Error("Mechanic not found");

  mechanicsRepository.merge(mechanic, data);
  return await mechanicsRepository.save(mechanic);
};


export const deleteMechanic = async (id) => {
  const mechanic = await mechanicsRepository.findOneBy({ id });

  if (!mechanic) throw new Error("Mechanic not found");

  return await mechanicsRepository.remove(mechanic);
};



