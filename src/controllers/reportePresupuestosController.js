import { AppDataSource } from "../config/data-source.js";



export const getReportePresupuestoById = async (req, res) => {
  try {

    const { id } = req.params;

    const repository =
      AppDataSource.getRepository("Presupuestos");

    const destinoRepository =
      AppDataSource.getRepository("Destinos");

    const p = await repository.findOne({
      where: { id },
      relations: {
        viaje: {
          rutas: true,
          vehicleTravels: { vehiculo: true },
          userTravels: { user: true },
        },
      },
    });

    if (!p) {
      return res.status(404).json({
        ok: false,
        msg: "No existe presupuesto",
      });
    }

    const viaje = p.viaje;

    const vehiculos =
      viaje?.vehicleTravels?.map(v => ({
        id: v.vehiculo?.id,
        placa: v.vehiculo?.placa,
        color: v.vehiculo?.color,
      })) || [];

    const chofer =
      viaje?.userTravels?.find(u => u.user?.tipo === "chofer")?.user;

    const encargado =
      viaje?.userTravels?.find(u => u.user?.tipo === "encargado")?.user;

    const rutas = await Promise.all(
      (viaje?.rutas || []).map(async (r) => {

        const destino = r.destino_id
          ? await destinoRepository.findOne({ where: { id: r.destino_id } })
          : null;

        return {
          id: r.id,
          destino_id: destino?.ruta || `Destino ${r.destino_id}`,
          kilometraje_principal: r.kilome,
          dest1: r.dest1,
          k1: r.k1,
          dest2: r.dest2,
          k2: r.k2,
          dest3: r.dest3,
          k3: r.k3,
          dest4: r.dest4,
          k4: r.k4,
          dest5: r.dest5,
          k5: r.k5,
          adicional: r.adicional,
          total: r.total,
        };
      })
    );

    return res.json({
      ok: true,
      data: {
        ...p,
        vehiculos,
        chofer,
        encargado,
        rutas,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error servidor",
    });
  }
};