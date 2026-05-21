import { informedeboluRepository } from "../repositories/informedeboluRepository.js";

export const getAllInformedebolu = async ({
  page,
  limit,
  search,
}) => {

  const query = informedeboluRepository
    .createQueryBuilder("i")
    .leftJoinAndSelect("i.informeviaje", "informeviaje")
    .orderBy("i.id", "DESC");

  if (search) {
    query.andWhere(
      `
      i.combus LIKE :search
      OR i.peaje LIKE :search
      OR i.impre LIKE :search
      OR i.totalcopeim LIKE :search
      `,
      {
        search: `%${search}%`,
      }
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

export const getInformedeboluById = async (id) => {

  const informe = await informedeboluRepository.findOne({
    where: { id },
    relations: ["informeviaje"],
  });

  if (!informe) {
    throw new Error("Informe de devolución no encontrado");
  }

  return informe;
};

export const createInformedebolu = async (data) => {

  const nuevo = informedeboluRepository.create({
    combus: data.combus,
    peaje: data.peaje,
    impre: data.impre,
    totalcopeim: data.totalcopeim,

    informeviaje: {
      id: data.informeviaje_id,
    },
  });

  return await informedeboluRepository.save(nuevo);
};

export const updateInformedebolu = async (id, data) => {

  const informe = await informedeboluRepository.findOne({
    where: { id },
    relations: ["informeviaje"],
  });

  if (!informe) {
    throw new Error("Informe de devolución no encontrado");
  }

  informedeboluRepository.merge(informe, {
    combus: data.combus,
    peaje: data.peaje,
    impre: data.impre,
    totalcopeim: data.totalcopeim,

    informeviaje: data.informeviaje_id
      ? { id: data.informeviaje_id }
      : informe.informeviaje,
  });

  return await informedeboluRepository.save(informe);
};

export const deleteInformedebolu = async (id) => {

  const informe = await informedeboluRepository.findOneBy({ id });

  if (!informe) {
    throw new Error("Informe de devolución no encontrado");
  }

  return await informedeboluRepository.remove(informe);
};