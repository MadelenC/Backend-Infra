// src/controllers/vehicleTravelController.js
import * as service from "../services/vehicle_travelService.js";

export const getVehicleTravels = async (req, res) => {
  try {
    const data = await service.getAllVehicleTravels();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVehicleTravelById = async (req, res) => {
  try {
    const data = await service.getVehicleTravelById(Number(req.params.id));
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createVehicleTravel = async (req, res) => {
  try {
    const nuevo = await service.createVehicleTravel(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVehicleTravel = async (req, res) => {
  try {
    await service.deleteVehicleTravel(Number(req.params.id));
    res.json({ message: "Relación eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};