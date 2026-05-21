import * as informedeboluService from "../services/informedeboluService.js";

export const getInformedebolu = async (req, res) => {

  try {

    const {
      page = 1,
      limit = 8,
      search,
    } = req.query;

    const data =
      await informedeboluService.getAllInformedebolu({
        page: Number(page),
        limit: Number(limit),
        search,
      });

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
};

export const getInformedeboluById = async (req, res) => {

  try {

    const informe =
      await informedeboluService.getInformedeboluById(
        Number(req.params.id)
      );

    res.json(informe);

  } catch (err) {

    res.status(404).json({
      error: err.message,
    });
  }
};

export const createInformedebolu = async (req, res) => {

  try {

    const nuevo =
      await informedeboluService.createInformedebolu(
        req.body
      );

    res.status(201).json(nuevo);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateInformedebolu = async (req, res) => {

  try {

    const actualizado =
      await informedeboluService.updateInformedebolu(
        Number(req.params.id),
        req.body
      );

    res.json(actualizado);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteInformedebolu = async (req, res) => {

  try {

    await informedeboluService.deleteInformedebolu(
      Number(req.params.id)
    );

    res.json({
      message: "Informe de devolución eliminado",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
};