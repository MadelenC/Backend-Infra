import * as modelosService from "../services/modelsService.js";

// Obtener todos los modelos
export const getModelos = async (req, res) => {
  try {
    const data = await modelosService.getAllModelos();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener modelo por ID
export const getModeloById = async (req, res) => {
  try {
    const modelo = await modelosService.getModeloById(Number(req.params.id));
    res.json(modelo);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Crear un nuevo modelo
export const createModelo = async (req, res) => {
  try {
    const result = await modelosService.createModelo(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar modelo existente
export const updateModelo = async (req, res) => {
  try {
    const result = await modelosService.updateModelo(
      Number(req.params.id),
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar modelo
export const deleteModelo = async (req, res) => {
  try {
    await modelosService.deleteModelo(Number(req.params.id));
    res.json({ message: "Modelo eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
