import * as entidadesService from "../services/entidadesService.js";

export const getEntidades = async (req, res) => {
  try {
    const entidades = await entidadesService.getAllEntidades();
    res.json(entidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEntidadById = async (req, res) => {
  try {
    const entidad = await entidadesService.getEntidadById(parseInt(req.params.id));
    res.json(entidad);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createEntidad = async (req, res) => {
  try {
    const resultado = await entidadesService.createEntidad(req.body);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEntidad = async (req, res) => {
  try {
    const resultado = await entidadesService.updateEntidad(parseInt(req.params.id), req.body);
    if (!resultado) return res.status(404).json({ error: "Entidad no encontrada" });
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEntidad = async (req, res) => {
  try {
    const resultado = await entidadesService.deleteEntidad(parseInt(req.params.id));
    if (!resultado) return res.status(404).json({ error: "Entidad no encontrada" });
    res.json({ message: "Entidad eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
