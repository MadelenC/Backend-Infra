import * as rutasService from "../services/routesServide.js";

// Obtener todas las rutas
export const getRutas = async (req, res) => {
  try {
    const rutas = await rutasService.getAllRutas();
    res.json(rutas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener ruta por ID
export const getRutaById = async (req, res) => {
  try {
    const ruta = await rutasService.getRutaById(parseInt(req.params.id));
    res.json(ruta);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear nueva ruta
export const createRuta = async (req, res) => {
  try {
    const nuevaRuta = await rutasService.createRuta(req.body);
    res.status(201).json(nuevaRuta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar ruta existente
export const updateRuta = async (req, res) => {
  try {
    const updated = await rutasService.updateRuta(
      parseInt(req.params.id),
      req.body
    );
    if (!updated) return res.status(404).json({ error: "Ruta no encontrada" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar ruta
export const deleteRuta = async (req, res) => {
  try {
    const deleted = await rutasService.deleteRuta(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Ruta no encontrada" });
    res.json({ message: "Ruta eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};