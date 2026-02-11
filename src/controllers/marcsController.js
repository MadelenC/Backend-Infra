import * as marcasService from "../services/marcsService.js";

// Obtener todas las marcas (con modelos)
export const getMarcas = async (req, res) => {
  try {
    const data = await marcasService.getAllMarcas();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una marca por ID (con modelo)
export const getMarcaById = async (req, res) => {
  try {
    const marca = await marcasService.getMarcaById(Number(req.params.id));
    res.json(marca);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear una nueva marca
export const createMarca = async (req, res) => {
  try {
    const result = await marcasService.createMarca(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar marca existente
export const updateMarca = async (req, res) => {
  try {
    const result = await marcasService.updateMarca(
      Number(req.params.id),
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar marca
export const deleteMarca = async (req, res) => {
  try {
    await marcasService.deleteMarca(Number(req.params.id));
    res.json({ message: "Marca eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
