// src/services/exceptionsService.js
import { exceptionsRepository } from "../repositories/exceptionsRepository.js";

// 🔹 Traer todas las excepciones con relación
export const getAllExceptions = async () => {
  return await exceptionsRepository.find({
    relations: ["rol"],
  });
};

// 🔹 Traer por ID
export const getExceptionById = async (id) => {
  const exception = await exceptionsRepository.findOne({
    where: { id },
    relations: ["rol"],
  });

  if (!exception) throw new Error("Excepción no encontrada");
  return exception;
};

// 🔹 Crear excepción
export const createException = async (data) => {
  try {
    console.log("📩 DATA RECIBIDA:", data);

    // 🔍 Validar rol (FK real)
    const rol = await rolesRepository.findOne({
      where: { id: Number(data.rol_id) },
    });

    console.log("📌 ROL ENCONTRADO:", rol);

    if (!rol) {
      throw new Error(`Rol con ID ${data.rol_id} no existe`);
    }

    // 🔧 Crear excepción
    const nueva = exceptionsRepository.create({
      chofer_id: data.chofer_id, // ⚠️ solo número
      tipo: data.tipo,
      lugar: data.lugar,
      fecha: data.fecha,
      rol: rol,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const guardado = await exceptionsRepository.save(nueva);

    console.log("✅ EXCEPCIÓN GUARDADA:", guardado);

    return guardado;

  } catch (error) {
    console.error("❌ ERROR EN createException:", error.message);
    throw error;
  }
};

// 🔹 Actualizar excepción
export const updateException = async (id, data) => {
  try {
    const exception = await exceptionsRepository.findOne({
      where: { id },
      relations: ["rol"],
    });

    if (!exception) throw new Error("Excepción no encontrada");

    // 🔄 Actualizar rol si viene
    if (data.rol_id) {
      const rol = await rolesRepository.findOne({
        where: { id: Number(data.rol_id) },
      });

      if (!rol) {
        throw new Error(`Rol con ID ${data.rol_id} no existe`);
      }

      exception.rol = rol;
    }

    // 🔄 Campos normales
    exception.chofer_id = data.chofer_id ?? exception.chofer_id;
    exception.tipo = data.tipo ?? exception.tipo;
    exception.lugar = data.lugar ?? exception.lugar;
    exception.fecha = data.fecha ?? exception.fecha;

    exception.updated_at = new Date();

    const actualizado = await exceptionsRepository.save(exception);

    console.log("🔄 EXCEPCIÓN ACTUALIZADA:", actualizado);

    return actualizado;

  } catch (error) {
    console.error("❌ ERROR EN updateException:", error.message);
    throw error;
  }
};

// 🔹 Eliminar excepción
export const deleteException = async (id) => {
  const exception = await exceptionsRepository.findOne({
    where: { id },
  });

  if (!exception) throw new Error("Excepción no encontrada");

  return await exceptionsRepository.remove(exception);
};