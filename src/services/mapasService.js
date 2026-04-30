import { mapasRepository } from "../repositories/mapasRepository.js";

export const getAllMapas = async ({ page , limit, search  }) => {
  const query = mapasRepository
    .createQueryBuilder("m")
    .leftJoinAndSelect("m.user", "user")
    .orderBy("m.id", "DESC");

  // SEARCH (opcional)
  if (search) {
    query.andWhere(
      "m.titulo LIKE :search OR user.destino LIKE :search",
      { search: `%${search}%` }
    );
  }

  // PAGINACIÓN
  query.skip((page - 1) * limit).take(limit);

  const [data, total] = await query.getManyAndCount();

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getMapaById = async (id) => {
  const mapa = await mapasRepository.findOne({
    where: { id },
    relations: ["user"],
  });

  if (!mapa) throw new Error("Mapa no encontrado");
  return mapa;
};

export const createMapa = async (data) => {
  const mapaAdd = {
    titulo: data.titulo,
    lat: data.lat,
    lng: data.lng,
    insertador: data.insertador,
    user: { id: data.user_id }, // usuario existente
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mapaCreate = mapasRepository.create(mapaAdd);
  return await mapasRepository.save(mapaCreate);
};

export const updateMapa = async (id, data) => {
  const mapa = await mapasRepository.findOneBy({ id });
  if (!mapa) throw new Error("Mapa no encontrado");

  mapasRepository.merge(mapa, {
    titulo: data.titulo,
    lat: data.lat,
    lng: data.lng,
    insertador: data.insertador,
    updated_at: new Date(),
  });

  return await mapasRepository.save(mapa);
};

export const deleteMapa = async (id) => {
  const mapa = await mapasRepository.findOneBy({ id });
  if (!mapa) throw new Error("Mapa no encontrado");

  return await mapasRepository.remove(mapa);
};
