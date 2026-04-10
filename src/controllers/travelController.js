import * as viajesService from "../services/travelService.js";

// --- Listar todos los viajes ---
export const getViajes = async (req, res) => {
  try {
    const viajes = await viajesService.getAllViajes();
    res.json(viajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Obtener viaje por ID ---
export const getViajeById = async (req, res) => {
  try {
    const viaje = await viajesService.getViajeById(parseInt(req.params.id));
    res.json(viaje);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// --- Crear viaje completo ---
export const createFullViaje = async (req, res) => {
  try {
    const nuevoViaje = await viajesService.createFullViaje(req.body);
    res.status(201).json(nuevoViaje);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- Actualizar viaje completo ---
export const updateFullViaje = async (req, res) => {
  try {
    const updated = await viajesService.updateFullViaje(
      parseInt(req.params.id),
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- Eliminar viaje completo ---
export const deleteFullViaje = async (req, res) => {
  try {
    const deleted = await viajesService.deleteFullViaje(parseInt(req.params.id));
    res.json({ message: "Viaje completo eliminado", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};