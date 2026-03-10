import { vehicleRepository } from "../repositories/vehicleRepository.js";
import { modelosRepository } from "../repositories/modelsRepository.js";
import { marcasRepository } from "../repositories/marcsRepository.js";

export const getAllVehicles = async () => {
  return await vehicleRepository.find({
    relations: ["modelos", "modelos.marcas"], // trae modelos y sus marcas
  });
};

export const getVehicleById = async (id) => {
  const vehicle = await vehicleRepository.findOne({
    where: { id },
    relations: ["modelos", "modelos.marcas"],
  });
  if (!vehicle) throw new Error("Vehículo no encontrado");
  return vehicle;
};

export const createVehicle = async (data) => {
  // Crear vehículo
  const vehicleData = {
    codigo: data.codigo,
    placa: data.placa,
    color: data.color,
    pasajeros: data.pasajeros,
    tipog: data.tipog,
    estado: data.estado,
    combustible: data.combustible,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const newVehicle = vehicleRepository.create(vehicleData);
  const savedVehicle = await vehicleRepository.save(newVehicle);

  //  Crear modelo relacionado
  if (data.modelo) {
    const modeloData = {
      modelo: data.modelo,
      tipoe: data.tipoe,
      kilometraje: data.kilometraje,
      vehiculo: savedVehicle,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const newModelo = modelosRepository.create(modeloData);
    const savedModelo = await modelosRepository.save(newModelo);

    // Crear marca si hay datos
    if (data.marca || data.chasis || data.motor || data.cilindrada) {
      const marcaData = {
        marca: data.marca,
        chasis: data.chasis,
        motor: data.motor,
        cilindrada: data.cilindrada,
        modelo: savedModelo, 
        created_at: new Date(),
        updated_at: new Date(),
      };
      const newMarca = marcasRepository.create(marcaData);
      await marcasRepository.save(newMarca);
    }
  }

  return savedVehicle;
};

export const updateVehicle = async (id, data) => {
  const vehicle = await vehicleRepository.findOne({
    where: { id },
    relations: ["modelos", "modelos.marcas"],
  });
  if (!vehicle) throw new Error("Vehículo no encontrado");

  //  Actualizar vehículo
  vehicleRepository.merge(vehicle, {
    codigo: data.codigo,
    placa: data.placa,
    color: data.color,
    pasajeros: data.pasajeros,
    tipog: data.tipog,
    estado: data.estado,
    combustible: data.combustible,
    updated_at: new Date(),
  });
  const updatedVehicle = await vehicleRepository.save(vehicle);

  // Actualizar o crear modelo
  let modelo = vehicle.modelos?.[0];
  if (modelo) {
    modelosRepository.merge(modelo, {
      modelo: data.modelo,
      tipoe: data.tipoe,
      kilometraje: data.kilometraje,
      updated_at: new Date(),
    });
    modelo = await modelosRepository.save(modelo);
  } else if (data.modelo) {
    const modeloData = {
      modelo: data.modelo,
      tipoe: data.tipoe,
      kilometraje: data.kilometraje,
      vehiculo: updatedVehicle,
      created_at: new Date(),
      updated_at: new Date(),
    };
    modelo = modelosRepository.create(modeloData);
    modelo = await modelosRepository.save(modelo);
  }

  // Actualizar o crear marca
  let marca = modelo?.marcas?.[0];
  if (marca) {
    marcasRepository.merge(marca, {
      marca: data.marca,
      chasis: data.chasis,
      motor: data.motor,
      cilindrada: data.cilindrada,
      updated_at: new Date(),
    });
    await marcasRepository.save(marca);
  } else if (modelo && (data.marca || data.chasis || data.motor || data.cilindrada)) {
    const marcaData = {
      marca: data.marca,
      chasis: data.chasis,
      motor: data.motor,
      cilindrada: data.cilindrada,
      modelo: modelo,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const newMarca = marcasRepository.create(marcaData);
    await marcasRepository.save(newMarca);
  }

  return updatedVehicle;
};

export const deleteVehicle = async (id) => {
  const vehicle = await vehicleRepository.findOne({
    where: { id },
    relations: ["modelos", "modelos.marcas"],
  });
  if (!vehicle) throw new Error("Vehículo no encontrado");

  return await vehicleRepository.remove(vehicle);
};
