import * as returnsService from "../services/returnsService.js";

export const getReturns = async (req, res) => {
  try {
    const data = await returnsService.getAllReturns();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReturnById = async (req, res) => {
  try {
    const ret = await returnsService.getReturnById(Number(req.params.id));
    res.json(ret);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const createReturn = async (req, res) => {
  try {
    const newReturn = await returnsService.createReturn(req.body);
    res.status(201).json(newReturn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReturn = async (req, res) => {
  try {
    const updatedReturn = await returnsService.updateReturn(
      Number(req.params.id),
      req.body
    );
    res.json(updatedReturn);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReturn = async (req, res) => {
  try {
    await returnsService.deleteReturn(Number(req.params.id));
    res.json({ message: "Return deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};