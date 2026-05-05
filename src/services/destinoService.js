import { destinoRepository } from "../repositories/destinoRepository.js";

export const getAllDestinos = async ({ page, limit, departamento, search }) => {
  const query = destinoRepository
    .createQueryBuilder("d")
    .orderBy("d.created_at", "DESC");

  
  if (departamento) {
   query.andWhere(
  "(d.dep_inicio = :dep OR d.dep_final = :dep)",
  { dep: departamento }
);
  }


  if (search) {
    query.andWhere(
      "d.origen LIKE :search OR d.destino LIKE :search OR d.ruta LIKE :search",
      { search: `%${search}%` }
    );
  }


  query.skip((page - 1) * limit).take(limit);

  const [data, total] = await query.getManyAndCount();

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getDestinoById = async (id) => {
  const destino = await destinoRepository.findOneBy({ id });
  if (!destino) throw new Error("Destino no encontrado");
  return destino;
};

export const createDestino = async (data) => {
  const nuevo = destinoRepository.create({
    dep_inicio: data.dep_inicio,
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

