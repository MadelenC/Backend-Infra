import * as rolTravelService from "../services/rolTravelService.js";

export const getRolTravel = async (req, res) => {
  try {
    const data = await rolTravelService.getAllRolTravel();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRolTravelById = async (req, res) => {
  try {
    const rol = await rolTravelService.getRolTravelById(Number(req.params.id));
    res.json(rol);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createRolTravel = async (req, res) => {
  try {
    const resultado = await rolTravelService.createRolTravel(req.body);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRolTravel = async (req, res) => {
  try {
    const resultado = await rolTravelService.updateRolTravel(
      Number(req.params.id),
      req.body
    );
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRolTravel = async (req, res) => {
  try {
    await rolTravelService.deleteRolTravel(Number(req.params.id));
    res.json({ message: "Rol de viaje eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
