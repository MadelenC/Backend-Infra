import * as service from "../services/kilomeinformesService.js";


// OBTENER TODOS
export const getKilomeinformes = async (req, res) => {
  try {

    const data = await service.getAllKilomeinformes();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};


// OBTENER POR ID
export const getKilomeinformeById = async (req, res) => {
  try {

    const data = await service.getKilomeinformeById(
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
export const createKilomeinforme = async (req, res) => {
  try {

    const nuevo = await service.createKilomeinforme(
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
export const deleteKilomeinforme = async (req, res) => {
  try {

    await service.deleteKilomeinforme(
      Number(req.params.id)
    );

    res.json({
      message: "Kilometraje eliminado",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};