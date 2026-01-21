// src/controllers/destinoController.js
import * as destinoService from "../services/destinoService.js";

export const getDestinos = async (req, res) => {
  try {
    const data = await destinoService.getAllDestinos();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDestinoById = async (req, res) => {
  try {
    const destino = await destinoService.getDestinoById(
      Number(req.params.id)
    );
    res.json(destino);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createDestino = async (req, res) => {
  try {
    const nuevo = await destinoService.createDestino(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDestino = async (req, res) => {
  try {
    const actualizado = await destinoService.updateDestino(
      Number(req.params.id),
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDestino = async (req, res) => {
  try {
    await destinoService.deleteDestino(Number(req.params.id));
    res.json({ message: "Destino eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
