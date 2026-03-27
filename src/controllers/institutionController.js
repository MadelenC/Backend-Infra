// src/controllers/institutionController.js
import * as institutionService from "../services/institutionService.js";

// Obtener todas
export const getInstitutions = async (req, res) => {
  try {
    const data = await institutionService.getAllInstitutions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener por ID
export const getInstitutionById = async (req, res) => {
  try {
    const institution = await institutionService.getInstitutionById(
      Number(req.params.id)
    );
    res.json(institution);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear
export const createInstitution = async (req, res) => {
  try {
    const nuevo = await institutionService.createInstitution(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar
export const updateInstitution = async (req, res) => {
  try {
    const actualizado = await institutionService.updateInstitution(
      Number(req.params.id),
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar
export const deleteInstitution = async (req, res) => {
  try {
    await institutionService.deleteInstitution(Number(req.params.id));
    res.json({ message: "Institution eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};