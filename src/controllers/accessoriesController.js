// src/controllers/accessoriesController.js
import * as accessoriesService from "../services/accessoriesService.js";

export const getAccessories = async (req, res) => {
  try {
    const data = await accessoriesService.getAllAccessories();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAccessoryById = async (req, res) => {
  try {
    const data = await accessoriesService.getAccessoryById(
      Number(req.params.id)
    );
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createAccessory = async (req, res) => {
  try {
    const nuevo = await accessoriesService.createAccessory(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAccessory = async (req, res) => {
  try {
    const actualizado = await accessoriesService.updateAccessory(
      Number(req.params.id),
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAccessory = async (req, res) => {
  try {
    await accessoriesService.deleteAccessory(Number(req.params.id));
    res.json({ message: "Accesorio eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};