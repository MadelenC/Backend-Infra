// src/controllers/maintenanceController.js
import * as maintenanceService from "../services/maintenanceService.js";

// Obtener todos
export const getMaintenances = async (req, res) => {
  try {
    const data = await maintenanceService.getAllMaintenances();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener por ID
export const getMaintenanceById = async (req, res) => {
  try {
    const maintenance = await maintenanceService.getMaintenanceById(
      Number(req.params.id)
    );
    res.json(maintenance);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear
export const createMaintenance = async (req, res) => {
  try {
    const nuevo = await maintenanceService.createMaintenance(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar
export const updateMaintenance = async (req, res) => {
  try {
    const actualizado = await maintenanceService.updateMaintenance(
      Number(req.params.id),
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar
export const deleteMaintenance = async (req, res) => {
  try {
    await maintenanceService.deleteMaintenance(Number(req.params.id));
    res.json({ message: "Mantenimiento eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};