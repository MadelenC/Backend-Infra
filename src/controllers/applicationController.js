// src/controllers/applicationController.js
import * as applicationService from "../services/applicationService.js";

export const getApplications = async (req, res) => {
  try {
    const { page, limit, chofer, vehiculoId } = req.query;

    const result = await applicationService.getAllApplications({
      page: Number(page) || 1,
      limit: Number(limit) || 8,
      chofer: chofer || "",
      vehiculoId: vehiculoId || "",
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await applicationService.getApplicationById(
      Number(req.params.id)
    );
    res.json(application);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createApplication = async (req, res) => {
  try {
    const nuevo = await applicationService.createApplication(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const actualizado = await applicationService.updateApplication(
      Number(req.params.id),
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    await applicationService.deleteApplication(Number(req.params.id));
    res.json({ message: "Solicitud eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};