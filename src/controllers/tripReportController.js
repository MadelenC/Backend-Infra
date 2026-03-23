import * as tripReportService from "../services/tripReportService.js";


export const getTripReports = async (req, res) => {
  try {
    const data = await tripReportService.getAllTripReports();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTripReportById = async (req, res) => {
  try {
    const report = await tripReportService.getTripReportById(
      Number(req.params.id)
    );
    res.json(report);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createTripReport = async (req, res) => {
  try {
    const nuevo = await tripReportService.createTripReport(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTripReport = async (req, res) => {
  try {
    const actualizado = await tripReportService.updateTripReport(
      Number(req.params.id),
      req.body
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTripReport = async (req, res) => {
  try {
    await tripReportService.deleteTripReport(Number(req.params.id));
    res.json({ message: "Informe de viaje eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};