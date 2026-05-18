import { AppDataSource }
from "../config/data-source.js";

import {
  ILike,
} from "typeorm";

export const getReporteUsuarios =
async (req, res) => {

  try {

    const { tipo } = req.query;

    const userRepository =
      AppDataSource.getRepository("User");

    let where = {};

    // FILTRO
    if (
      tipo &&
      tipo !== "todos"
    ) {

      where = {
        tipo: ILike(tipo),
      };

    }

    const usuarios =
      await userRepository.find({

        where,

        order: {
          apellidos: "ASC",
        },

      });

    return res.json({

      ok: true,

      data: usuarios,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      ok: false,

      msg: "Error servidor",

    });

  }

};