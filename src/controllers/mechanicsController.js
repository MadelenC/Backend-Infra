
import * as mechanicsService from "../services/mechanicsService.js";


export const getMechanics = async (
  req,
  res
) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 8;

    const search =
      req.query.search || "";

    const data =
      await mechanicsService.getAllMechanics({
        page,
        limit,
        search,
      });

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};


export const getMechanicById = async (req, res) => {
  try {
    const mechanic = await mechanicsService.getMechanicById(
      Number(req.params.id)
    );
    res.json(mechanic);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


export const createMechanic = async (req, res) => {
  try {
    const newMechanic = await mechanicsService.createMechanic(req.body);
    res.status(201).json(newMechanic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateMechanic = async (req, res) => {
  try {
    const updatedMechanic = await mechanicsService.updateMechanic(
      Number(req.params.id),
      req.body
    );
    res.json(updatedMechanic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteMechanic = async (req, res) => {
  try {
    await mechanicsService.deleteMechanic(Number(req.params.id));
    res.json({ message: "Mechanic deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



