import * as mapasService from "../services/mapasService.js";

export const getMapas = async (req, res) => {
  try {
    const data = await mapasService.getAllMapas();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMapaById = async (req, res) => {
  try {
    const mapa = await mapasService.getMapaById(Number(req.params.id));
    res.json(mapa);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createMapa = async (req, res) => {
  try {
    const resultado = await mapasService.createMapa(req.body);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMapa = async (req, res) => {
  try {
    const resultado = await mapasService.updateMapa(
      Number(req.params.id),
      req.body
    );
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMapa = async (req, res) => {
  try {
    await mapasService.deleteMapa(Number(req.params.id));
    res.json({ message: "Mapa eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
