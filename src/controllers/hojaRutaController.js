import { AppDataSource } from "../config/data-source.js";

export const generarHojaRuta = async (req, res) => {

  try {

    const { id } = req.params;

    const viajesRepository =
      AppDataSource.getRepository("Viajes");

    const destinosRepository =
      AppDataSource.getRepository("Destinos");

    const viaje = await viajesRepository.findOne({

      where: {
        id: Number(id),
      },

      relations: {

        presupuestos: true,

        rutas: true,

        vehicleTravels: {
          vehiculo: true,
        },

        userTravels: {
          user: true,
        },

      },

    });

    if (!viaje) {

      return res.status(404).json({
        ok: false,
        msg: "Viaje no encontrado",
      });

    }

    // =========================
    // VEHICULOS
    // =========================

    const vehiculos =
      viaje.vehicleTravels?.map((v) => ({

        id:
          v?.vehiculo?.id || null,

        placa:
          v?.vehiculo?.placa || "",

        tipo:
          v?.vehiculo?.tipog || "",

        detalle:
          `${v?.vehiculo?.placa || ""} - ${v?.vehiculo?.tipog || ""}`,

      })) || [];

    // =========================
    // CONDUCTORES
    // =========================

    const conductores =
      viaje.userTravels
        ?.filter((u) => {

          return (
            u.user &&
            u.user.tipo === "chofer"
          );

        })
        ?.map((u, index) => ({

          nro:
            index + 1,

          nombres:
            u?.user?.nombres || "",

          apellidos:
            u?.user?.apellidos || "",

          celular:
            u?.user?.celular || "",

          nombreCompleto:
            `${u?.user?.nombres || ""} ${u?.user?.apellidos || ""}`,

        })) || [];

    // =========================
    // ENCARGADOS
    // =========================

    const encargados =
      viaje.userTravels
        ?.filter((u) => {

          return (
            u.user &&
            u.user.tipo === "encargado"
          );

        })
        ?.map((u, index) => ({

          nro:
            index + 1,

          nombres:
            u?.user?.nombres || "",

          apellidos:
            u?.user?.apellidos || "",

          celular:
            u?.user?.celular || "",

          nombreCompleto:
            `${u?.user?.nombres || ""} ${u?.user?.apellidos || ""}`,

        })) || [];

    // =========================
    // PRESUPUESTO
    // =========================

    const presupuesto =
      viaje.presupuestos?.[0];

    // =========================
    // RUTAS
    // =========================

    const rutasConDestino = [];

    for (const ruta of viaje.rutas) {

      const destinosIds = [

        ruta.destino_id,
        ruta.dest1,
        ruta.dest2,
        ruta.dest3,
        ruta.dest4,
        ruta.dest5,

      ].filter((id) => {

        return id && id !== 0;

      });

      for (const destinoId of destinosIds) {

        const destino =
          await destinosRepository.findOne({

            where: {
              id: Number(destinoId),
            },

          });

        if (destino) {

          rutasConDestino.push({

            departamento_inicio:
              destino.dep_inicio,

            origen:
              destino.origen,

            ruta_texto:
              destino.ruta,

            departamento_destino:
              destino.dep_final,

            destino:
              destino.destino,

            tiempo:
              destino.tiempo,

            kilometraje:
              destino.kilometraje,

          });

        }

      }

    }

    // =========================
    // KILOMETRAJE TOTAL
    // =========================

    const kilometrajeTotal =
      rutasConDestino.reduce((acc, item) => {

        return (
          acc +
          Number(item.kilometraje || 0)
        );

      }, 0);

    // =========================
    // DATA FINAL
    // =========================

    const data = {

      id:
        viaje.id,

      objetivo:
        viaje.objetivo || "",

      entidad:
        viaje.entidad || "",

      dias:
        viaje.dias || 0,

      pasajeros:
        viaje.pasajeros || 0,

      fecha_salida:
        viaje.fecha_inicial || "",

      fecha_retorno:
        viaje.fecha_final || "",

      hora_salida:
        presupuesto?.hsalida || "",

      hora_llegada:
        presupuesto?.hllegada || "",

      combustible:
        presupuesto?.cantidad1 || 0,

      kilometraje_total:
        kilometrajeTotal,

      vehiculos,

      conductores,

      encargados,

      rutas:
        rutasConDestino,

    };

    return res.json({

      ok: true,

      data,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      ok: false,

      msg: "Error del servidor",

    });

  }

};