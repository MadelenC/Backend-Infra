import * as salidasService from "../services/departuresService.js";

// Obtener todas las salidas
export const getSalidas = async (req, res) => {
  try {
    const data = await salidasService.getAllSalidas();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener salida por ID
export const getSalidaById = async (req, res) => {
  try {
    const salida = await salidasService.getSalidaById(Number(req.params.id));
    res.json(salida);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear una nueva salida
export const createSalida = async (req, res) => {
  try {
    const result = await salidasService.createSalida(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar salida existente
export const updateSalida = async (req, res) => {
  try {
    const result = await salidasService.updateSalida(
      Number(req.params.id),
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar salida
export const deleteSalida = async (req, res) => {
  try {
    await salidasService.deleteSalida(Number(req.params.id));
    res.json({ message: "Salida eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};