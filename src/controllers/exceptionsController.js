// src/controllers/exceptionsController.js
import * as exceptionsService from "../services/exceptionsService.js";

export const getExceptions = async (req, res) => {
  try {
    const data = await exceptionsService.getAllExceptions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExceptionById = async (req, res) => {
  try {
    const data = await exceptionsService.getExceptionById(
      Number(req.params.id)
    );
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createException = async (req, res) => {
  try {
    const nueva = await exceptionsService.createException(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateException = async (req, res) => {
  try {
    const actualizada = await exceptionsService.updateException(
      Number(req.params.id),
      req.body
    );
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteException = async (req, res) => {
  try {
    await exceptionsService.deleteException(Number(req.params.id));
    res.json({ message: "Excepción eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};