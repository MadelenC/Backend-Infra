import { departuresRepository } from "../repositories/departuresRepository.js";
import { vehicleRepository } from "../repositories/vehicleRepository.js";
import { userRepository } from "../repositories/userRepository.js";


export const getAllSalidas = async () => {
  return await departuresRepository.find({
    relations: ["vehiculo", "chofer"],
  });
};


export const getSalidaById = async (id) => {
  const salida = await departuresRepository.findOne({
    where: { id },
    relations: ["vehiculo", "chofer"],
  });

  if (!salida) throw new Error("Salida no encontrada");
  return salida;
};


export const createSalida = async (data) => {
  try {
    console.log("📩 DATA RECIBIDA:", data);

    // Buscar vehículo
    const vehiculo = await vehicleRepository.findOne({
      where: { id: Number(data.vehiculo) },
    });

    console.log("🚗 VEHÍCULO ENCONTRADO:", vehiculo);

    if (!vehiculo) {
      throw new Error(`Vehículo con ID ${data.vehiculo} no existe`);
    }

    //  Buscar chofer
    const chofer = await userRepository.findOne({
      where: { id: Number(data.chofer) },
    });

    console.log("👤 CHOFER ENCONTRADO:", chofer);

    if (!chofer) {
      throw new Error(`Chofer con ID ${data.chofer} no existe`);
    }

    //  Crear salida
    const nuevaSalida = departuresRepository.create({
      lugar: data.lugar,
      motivo: data.motivo,
      responsable: data.responsable,
      hsalida: data.hsalida,
      hllegada: data.hllegada,
      vehiculo: vehiculo,
      chofer: chofer,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const guardado = await departuresRepository.save(nuevaSalida);

    console.log("✅ SALIDA GUARDADA:", guardado);

    return guardado;

  } catch (error) {
    console.error("❌ ERROR EN createSalida:", error.message);
    throw error;
  }
};

// Actualizar salida
export const updateSalida = async (id, data) => {
  try {
    const salida = await departuresRepository.findOne({
      where: { id },
      relations: ["vehiculo", "chofer"],
    });

    if (!salida) throw new Error("Salida no encontrada");

    // Vehículo
    if (data.vehiculo) {
      const vehiculo = await vehicleRepository.findOne({
        where: { id: Number(data.vehiculo) },
      });

      if (!vehiculo) {
        throw new Error(`Vehículo con ID ${data.vehiculo} no existe`);
      }

      salida.vehiculo = vehiculo;
    }

    // Chofer
    if (data.chofer) {
      const chofer = await userRepository.findOne({
        where: { id: Number(data.chofer) },
      });

      if (!chofer) {
        throw new Error(`Chofer con ID ${data.chofer} no existe`);
      }

      salida.chofer = chofer;
    }

    // Campos normales
    salida.lugar = data.lugar ?? salida.lugar;
    salida.motivo = data.motivo ?? salida.motivo;
    salida.responsable = data.responsable ?? salida.responsable;
    salida.hsalida = data.hsalida ?? salida.hsalida;
    salida.hllegada = data.hllegada ?? salida.hllegada;

    const actualizado = await departuresRepository.save(salida);

    console.log("🔄 SALIDA ACTUALIZADA:", actualizado);

    return actualizado;

  } catch (error) {
    console.error("❌ ERROR EN updateSalida:", error.message);
    throw error;
  }
};

// 🔹 Eliminar salida
export const deleteSalida = async (id) => {
  const salida = await departuresRepository.findOne({
    where: { id },
  });

  if (!salida) throw new Error("Salida no encontrada");

  return await departuresRepository.remove(salida);
};