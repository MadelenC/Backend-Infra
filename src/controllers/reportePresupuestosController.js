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

          const destino1 = r.dest1
  ? await destinoRepository.findOne({
      where: { id: r.dest1 }
    })
  : null;

const destino2 = r.dest2
  ? await destinoRepository.findOne({
      where: { id: r.dest2 }
    })
  : null;

const destino3 = r.dest3
  ? await destinoRepository.findOne({
      where: { id: r.dest3 }
    })
  : null;

const destino4 = r.dest4
  ? await destinoRepository.findOne({
      where: { id: r.dest4 }
    })
  : null;

const destino5 = r.dest5
  ? await destinoRepository.findOne({
      where: { id: r.dest5 }
    })
  : null;

        return {
          id: r.id,
          destino_id: destino
          ? `(${destino.dep_inicio}): ${destino.origen} HASTA (${destino.dep_final}): ${destino.destino}`
          : `Destino ${r.destino_id}`,
          kilometraje_principal: r.kilome,
          dest1: destino1
            ? `(${destino1.dep_inicio}): ${destino1.origen} HASTA (${destino1.dep_final}): ${destino1.destino}`
            : r.dest1,
          k1: r.k1,
          dest2: destino2
          ? `(${destino2.dep_inicio}): ${destino2.origen} HASTA (${destino2.dep_final}): ${destino2.destino}`
          : r.dest2,
          k2: r.k2,
          dest3: destino3
          ? `(${destino3.dep_inicio}): ${destino3.origen} HASTA (${destino3.dep_final}): ${destino3.destino}`
          : r.dest3,
          k3: r.k3,
          dest4: destino4
          ? `(${destino4.dep_inicio}): ${destino4.origen} HASTA (${destino4.dep_final}): ${destino4.destino}`
          : r.dest4,
          k4: r.k4,
         dest5: destino5
          ? `(${destino5.dep_inicio}): ${destino5.origen} HASTA (${destino5.dep_final}): ${destino5.destino}`
          : r.dest5,
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