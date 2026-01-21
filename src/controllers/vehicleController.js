import * as vehicleService from "../services/vehicleService.js";

// Obtener todos los vehículos
export const getVehicles = async (req, res) => {
  try {
    const data = await vehicleService.getAllVehicles();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener vehículo por ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(Number(req.params.id));
    res.json(vehicle);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear un nuevo vehículo
export const createVehicle = async (req, res) => {
  try {
    const result = await vehicleService.createVehicle(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar vehículo existente
export const updateVehicle = async (req, res) => {
  try {
    const result = await vehicleService.updateVehicle(
      Number(req.params.id),
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar vehículo
export const deleteVehicle = async (req, res) => {
  try {
    await vehicleService.deleteVehicle(Number(req.params.id));
    res.json({ message: "Vehículo eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
