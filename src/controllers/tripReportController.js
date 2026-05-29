import * as tripReportService from "../services/tripReportService.js";


export const getTripReports = async (req, res) => {
  try {
    const { page = 1, limit = 8, search = "" } = req.query;

    const result = await tripReportService.getAllTripReports({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    return res.json(result);

  } catch (err) {
    console.error("❌ ERROR getTripReports:", err);
    return res.status(500).json({ message: err.message });
  }
};


export const getTripReportById = async (req, res) => {
  try {
    const report = await tripReportService.getTripReportById(
      Number(req.params.id)
    );

    return res.json(report);

  } catch (err) {
    console.error("❌ ERROR getTripReportById:", err);
    return res.status(404).json({ error: err.message });
  }
};

export const createTripReport = async (req, res) => {
  try {
    console.log("🔥 BODY RECIBIDO:", req.body);

    const nuevo = await tripReportService.createFullTripReport(req.body);

    return res.status(201).json(nuevo);

  } catch (err) {
    console.error("❌ ERROR createTripReport:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
};


export const updateTripReport = async (req, res) => {
  try {
    const actualizado = await tripReportService.updateTripReport(
      Number(req.params.id),
      req.body
    );

    return res.json(actualizado);

  } catch (err) {
    console.error("❌ ERROR updateTripReport:", err);
    return res.status(500).json({ error: err.message });
  }
};


export const deleteTripReport = async (req, res) => {
  try {
    await tripReportService.deleteTripReport(Number(req.params.id));

    return res.json({ message: "Informe de viaje eliminado" });

  } catch (err) {
    console.error("❌ ERROR deleteTripReport:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getMyDriverReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const reports = await tripReportService.getTripReportsByDriver({
      userId,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 8,
    });

    res.status(200).json(reports);

  } catch (error) {
    console.error("Error obteniendo informes del chofer:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};