// controllers/infoviajeController.js
import * as infoviajeService from "../services/infoviajeService.js";

// Obtener todos
export const getInfoviajes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const data = await infoviajeService.getAllInfoviajes({
      page: Number(page),
      limit: Number(limit),
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Obtener por ID
export const getInfoviajeById = async (req, res) => {
  try {
    const data = await infoviajeService.getInfoviajeById(
      Number(req.params.id)
    );

    res.json(data);
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};

// Crear
export const createInfoviaje = async (req, res) => {
  try {
    const result = await infoviajeService.createInfoviaje(
      req.body
    );

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Actualizar
export const updateInfoviaje = async (req, res) => {
  try {
    const result = await infoviajeService.updateInfoviaje(
      Number(req.params.id),
      req.body
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Eliminar
export const deleteInfoviaje = async (req, res) => {
  try {
    await infoviajeService.deleteInfoviaje(
      Number(req.params.id)
    );

    res.json({
      message: "Infoviaje eliminado",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};