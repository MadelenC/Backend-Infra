// src/controllers/destinoViajeController.js
import * as service from "../services/destino_viajeService.js";

export const getDestinoViajes = async (req, res) => {
  try {
    const data = await service.getAllDestinoViajes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDestinoViajeById = async (req, res) => {
  try {
    const data = await service.getDestinoViajeById(Number(req.params.id));
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createDestinoViaje = async (req, res) => {
  try {
    const nuevo = await service.createDestinoViaje(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDestinoViaje = async (req, res) => {
  try {
    await service.deleteDestinoViaje(Number(req.params.id));
    res.json({ message: "Relación eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};