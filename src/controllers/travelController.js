import * as viajesService from "../services/travelService.js";

// Obtener todos los viajes
export const getViajes = async (req, res) => {
  try {
    const viajes = await viajesService.getAllViajes();
    res.json(viajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener viaje por ID
export const getViajeById = async (req, res) => {
  try {
    const viaje = await viajesService.getViajeById(parseInt(req.params.id));
    res.json(viaje);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear nuevo viaje
export const createViaje = async (req, res) => {
  try {
    const nuevoViaje = await viajesService.createViaje(req.body);
    res.status(201).json(nuevoViaje);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar viaje existente
export const updateViaje = async (req, res) => {
  try {
    const updated = await viajesService.updateViaje(
      parseInt(req.params.id),
      req.body
    );
    if (!updated) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar viaje
export const deleteViaje = async (req, res) => {
  try {
    const deleted = await viajesService.deleteViaje(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json({ message: "Viaje eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};