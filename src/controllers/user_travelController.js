// src/controllers/userTravelController.js
import * as service from "../services/user_travelService.js";

export const getUserTravels = async (req, res) => {
  try {
    const data = await service.getAllUserTravels();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserTravelById = async (req, res) => {
  try {
    const data = await service.getUserTravelById(Number(req.params.id));
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createUserTravel = async (req, res) => {
  try {
    const nuevo = await service.createUserTravel(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUserTravel = async (req, res) => {
  try {
    await service.deleteUserTravel(Number(req.params.id));
    res.json({ message: "Relación eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};