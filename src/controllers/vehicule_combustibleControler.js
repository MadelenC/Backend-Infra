import * as vehicleService from "../services/vehicles_combustibleService.js";

// Obtener todos los vehículos
export const getVehiclesCombustible = async (req, res) => {
  try {
    const { page = 1, limit = 10, estado } = req.query;

    const data = await vehicleService.getAllVehicles({
      page: Number(page),
      limit: Number(limit),
      estado,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//resumen
export const getResumenVehiculosCombustible = async (req, res) => {
  try {
    const { estado } = req.query;

    const data = await vehicleService.getResumenVehiculos({ estado });

    res.json({
      data,
      total: data.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getCombustibleMensual = async (req, res) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();

    const data = await vehicleService.getCombustibleMensual(year);

    return res.json(data);
  } catch (err) {
    console.error("ERROR combustible mensual:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getCombustibleAnual = async (req, res) => {
  try {
    const data = await vehicleService.getCombustibleAnual();

    return res.json(data);
  } catch (err) {
    console.error("ERROR combustible anual:", err);
    return res.status(500).json({ error: err.message });
  }
};