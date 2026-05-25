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