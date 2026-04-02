// src/services/requestService.js
import { requestRepository } from "../repositories/requestRepository.js";

export const getAllRequests = async () => {
  try {
    return await requestRepository.find({
      relations: ["solicitud","solicitud.vehiculo"],
      order: { id: "DESC" },
    });
  } catch (error) {
    throw new Error("Error al obtener requests: " + error.message);
  }
};

export const getRequestById = async (id) => {
  try {
    const request = await requestRepository.findOne({
      where: { id },
      relations: ["solicitud","solicitud.vehiculo"],
    });

    if (!request) {
      throw new Error("Request no encontrado");
    }

    return request;
  } catch (error) {
    throw new Error("Error al obtener request: " + error.message);
  }
};

export const createRequest = async (data) => {
  try {
    // Validaciones básicas (puedes ampliar)
    if (!data.orden || !data.fecha || !data.nombre) {
      throw new Error("Faltan campos obligatorios");
    }

    const nuevo = requestRepository.create({
      orden: data.orden,
      fecha: data.fecha,
      cantidad: data.cantidad,
      nombre: data.nombre,
      descripcion: data.descripcion,
      insertador: data.insertador,
      observacion: data.observacion,
      justificacion: data.justificacion,

      cantidad1: data.cantidad1,
      medida1: data.medida1,
      descripcion1: data.descripcion1,

      cantidad2: data.cantidad2,
      medida2: data.medida2,
      descripcion2: data.descripcion2,

      cantidad3: data.cantidad3,
      medida3: data.medida3,
      descripcion3: data.descripcion3,

      cantidad4: data.cantidad4,
      medida4: data.medida4,
      descripcion4: data.descripcion4,

      cantidad5: data.cantidad5,
      medida5: data.medida5,
      descripcion5: data.descripcion5,

      cantidad6: data.cantidad6,
      medida6: data.medida6,
      descripcion6: data.descripcion6,

      cantidad7: data.cantidad7,
      medida7: data.medida7,
      descripcion7: data.descripcion7,

      cantidad8: data.cantidad8,
      medida8: data.medida8,
      descripcion8: data.descripcion8,

      cantidad9: data.cantidad9,
      medida9: data.medida9,
      descripcion9: data.descripcion9,

      cantidad10: data.cantidad10,
      medida10: data.medida10,
      descripcion10: data.descripcion10,

      cantidad11: data.cantidad11,
      medida11: data.medida11,
      descripcion11: data.descripcion11,

      km: data.km,
      respuestas: data.respuestas,
      conteo: data.conteo,
      idh: data.idh,

      // relación
      solicitud: data.solicitud,
    });

    return await requestRepository.save(nuevo);
  } catch (error) {
    throw new Error("Error al crear request: " + error.message);
  }
};

export const updateRequest = async (id, data) => {
  try {
    const request = await requestRepository.findOneBy({ id });

    if (!request) {
      throw new Error("Request no encontrado");
    }

    requestRepository.merge(request, data);

    return await requestRepository.save(request);
  } catch (error) {
    throw new Error("Error al actualizar request: " + error.message);
  }
};

export const deleteRequest = async (id) => {
  try {
    const request = await requestRepository.findOneBy({ id });

    if (!request) {
      throw new Error("Request no encontrado");
    }

    await requestRepository.remove(request);

    return { message: "Request eliminado correctamente" };
  } catch (error) {
    throw new Error("Error al eliminar request: " + error.message);
  }
};