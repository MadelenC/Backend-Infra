// src/controllers/budgetsController.js
import * as budgetsService from "../services/budgetsService.js";

// Traer todos los presupuestos
export const getBudgets = async (req, res) => {
  try {
    const data = await budgetsService.getAllBudgets();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Traer un presupuesto por ID
export const getBudgetById = async (req, res) => {
  try {
    const presupuesto = await budgetsService.getBudgetById(
      Number(req.params.id)
    );
    res.json(presupuesto);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear un nuevo presupuesto
export const createBudget = async (req, res) => {
  try {
    const nuevo = await budgetsService.createBudget(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un presupuesto existente
export const updateBudget = async (req, res) => {
  try {
    const actualizado = await budgetsService.updateBudget(
      Number(req.params.id),
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un presupuesto
export const deleteBudget = async (req, res) => {
  try {
    await budgetsService.deleteBudget(Number(req.params.id));
    res.json({ message: "Presupuesto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};