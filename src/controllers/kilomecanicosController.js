import * as service from "../services/kilomecanicosService.js";


// OBTENER TODOS
export const getKilomecanicos = async (req, res) => {
  try {

    const data = await service.getAllKilomecanicos();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};


// OBTENER POR ID
export const getKilomecanicoById = async (req, res) => {
  try {

    const data = await service.getKilomecanicoById(
      Number(req.params.id)
    );

    res.json(data);

  } catch (err) {

    res.status(404).json({
      error: err.message,
    });

  }
};


// CREAR
export const createKilomecanico = async (req, res) => {
  try {

    const nuevo = await service.createKilomecanico(
      req.body
    );

    res.status(201).json(nuevo);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};


// ELIMINAR
export const deleteKilomecanico = async (req, res) => {
  try {

    await service.deleteKilomecanico(
      Number(req.params.id)
    );

    res.json({
      message: "Kilometraje mecánico eliminado",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};