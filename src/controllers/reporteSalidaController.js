import { AppDataSource } from "../config/data-source.js";

export const getSalidaById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ ok: false, msg: "El ID de la salida es requerido" });
    }

    const departureRepository = AppDataSource.getRepository("Salidas");

  
    const salida = await departureRepository.findOne({
      where: { id: parseInt(id) },
      relations: ["vehiculo", "chofer"],
    });

    if (!salida) {
      return res.status(404).json({ ok: false, msg: "Salida no encontrada" });
    }

    
    const dataBoleta = {
      vehiculo: {
        id: salida.vehiculo?.id,
        placa: salida.vehiculo?.placa,
        codigo: salida.vehiculo?.codigo,
        tipog: salida.vehiculo?.tipog,
      },
      Chofer: salida.chofer ? `${salida.chofer.nombre} ${salida.chofer.apellido}` : "N/A",
      Responsable: salida.responsable,
      Lugar: salida.lugar,
      Motivo: salida.motivo,
      Salida: salida.hsalida,
      Llegada: salida.hllegada,
    };

    return res.status(200).json({ ok: true, data: dataBoleta });

  } catch (error) {
    console.error("Error al obtener la boleta:", error);
    return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};