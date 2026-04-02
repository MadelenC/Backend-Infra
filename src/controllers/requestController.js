// src/controllers/requestController.js
import * as requestService from "../services/requestService.js";

export const getRequests = async (req, res) => {
  try {
    const data = await requestService.getAllRequests();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const data = await requestService.getRequestById(
      Number(req.params.id)
    );
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const nuevo = await requestService.createRequest(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const actualizado = await requestService.updateRequest(
      Number(req.params.id),
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    await requestService.deleteRequest(Number(req.params.id));
    res.json({ message: "Request eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};