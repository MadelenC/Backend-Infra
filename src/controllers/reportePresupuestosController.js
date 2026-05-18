import { AppDataSource } from "../config/data-source.js";

export const getReportePresupuestos = async (req, res) => {

  try {

    // =====================================
    // REPOSITORIES
    // =====================================

    const repository =
      AppDataSource.getRepository("Presupuestos");

    const destinoRepository =
      AppDataSource.getRepository("Destinos");

    // =====================================
    // CONSULTA
    // =====================================

    const presupuestos =
      await repository.find({

        relations: {

          viaje: {

            rutas: true,

            vehicleTravels: {
              vehiculo: true,
            },

            userTravels: {
              user: true,
            },

          },

        },

      });

    // =====================================
    // MAPEO
    // =====================================

    const data = await Promise.all(

      presupuestos.map(async (p) => {

        const viaje = p.viaje;

        // =====================================
        // VEHICULOS
        // =====================================

        const vehiculos =
          viaje?.vehicleTravels?.map(v => ({

            id:
              v.vehiculo?.id,

            detalle:
              v.vehiculo?.detalle,

            placa:
              v.vehiculo?.placa,

            marca:
              v.vehiculo?.marca,

            modelo:
              v.vehiculo?.modelo,

            color:
              v.vehiculo?.color,

          })) || [];

        // =====================================
        // CHOFER
        // =====================================

        const chofer =
          viaje?.userTravels
            ?.find(u =>
              u.user?.tipo === "chofer"
            )?.user;

        // =====================================
        // ENCARGADO
        // =====================================

        const encargado =
          viaje?.userTravels
            ?.find(u =>
              u.user?.tipo === "encargado"
            )?.user;

        // =====================================
        // RUTAS
        // =====================================

        const rutas = await Promise.all(

          (viaje?.rutas || []).map(async (r) => {

            // =========================
            // DESTINO PRINCIPAL
            // =========================

            const destinoPrincipal =
              r.destino_id
                ? await destinoRepository.findOne({
                    where: {
                      id: r.destino_id,
                    },
                  })
                : null;

            // =========================
            // DESTINO 1
            // =========================

            const destino1 =
              r.dest1
                ? await destinoRepository.findOne({
                    where: {
                      id: r.dest1,
                    },
                  })
                : null;

            // =========================
            // DESTINO 2
            // =========================

            const destino2 =
              r.dest2
                ? await destinoRepository.findOne({
                    where: {
                      id: r.dest2,
                    },
                  })
                : null;

            // =========================
            // DESTINO 3
            // =========================

            const destino3 =
              r.dest3
                ? await destinoRepository.findOne({
                    where: {
                      id: r.dest3,
                    },
                  })
                : null;

            // =========================
            // DESTINO 4
            // =========================

            const destino4 =
              r.dest4
                ? await destinoRepository.findOne({
                    where: {
                      id: r.dest4,
                    },
                  })
                : null;

            // =========================
            // DESTINO 5
            // =========================

            const destino5 =
              r.dest5
                ? await destinoRepository.findOne({
                    where: {
                      id: r.dest5,
                    },
                  })
                : null;

            // =========================
            // RETURN RUTAS
            // =========================

            return {

              id:
                r.id,

              destino_id:
                destinoPrincipal?.ruta ||
                `Destino ${r.destino_id}`,

              kilometraje_principal:
                r.kilome,

              dest1:
                destino1?.ruta ||
                `Destino ${r.dest1}`,

              k1:
                r.k1,

              dest2:
                destino2?.ruta ||
                (r.dest2
                  ? `Destino ${r.dest2}`
                  : null),

              k2:
                r.k2,

              dest3:
                destino3?.ruta ||
                (r.dest3
                  ? `Destino ${r.dest3}`
                  : null),

              k3:
                r.k3,

              dest4:
                destino4?.ruta ||
                (r.dest4
                  ? `Destino ${r.dest4}`
                  : null),

              k4:
                r.k4,

              dest5:
                destino5?.ruta ||
                (r.dest5
                  ? `Destino ${r.dest5}`
                  : null),

              k5:
                r.k5,

              adicional:
                r.adicional,

              total:
                r.total,

            };

          })

        );

        // =====================================
        // RETURN
        // =====================================

        return {

          // =====================================
          // PRESUPUESTO
          // =====================================

          presupuesto_id:
            p.id,

          entidad:
            p.entidad,

          fecha_sa:
            p.fecha_sa,

          responsable:
            p.responsable,

          materia:
            p.materia,

          sigla:
            p.sigla,

          ndocentes:
            p.ndocentes,

          nota:
            p.nota,

          hora_salida:
            p.hsalida,

          hora_llegada:
            p.hllegada,

          diferencia:
            p.diferencia,

          total_general:
            p.total8T,

          // =====================================
          // COMBUSTIBLE
          // =====================================

          combustible: {

            division:
              p.division1,

            tipo:
              p.combustible1,

            cantidad:
              p.cantidad1,

            carta:
              p.carta1,

            precio:
              p.precio1,

            total:
              p.total1C,

          },

          // =====================================
          // VIATICOS
          // =====================================

          viaticos: {

            ciudad: {

              cantidad:
                p.cantidad2,

              precio:
                p.precio2,

              total:
                p.total2VC,

            },

            provincia: {

              cantidad:
                p.cantidad3,

              precio:
                p.precio3,

              total:
                p.total3VP,

            },

            frontera: {

              cantidad:
                p.cantidad4,

              precio:
                p.precio4,

              total:
                p.total4VF,

            },

          },

          // =====================================
          // PEAJES
          // =====================================

          peajes: {

            cantidad:
              p.cantidad5,

            precio:
              p.precio5,

            total:
              p.total5P,

          },

          // =====================================
          // MANTENIMIENTO
          // =====================================

          mantenimiento: {

            cantidad:
              p.cantidad6,

            precio:
              p.precio6,

            total:
              p.total6M,

          },

          // =====================================
          // GARAJE
          // =====================================

          garaje: {

            cantidad:
              p.cantidad7,

            precio:
              p.precio7,

            total:
              p.total7G,

          },

          // =====================================
          // VIAJE
          // =====================================

          viaje: {

            id:
              viaje?.id,

            tipo:
              viaje?.tipo,

            objetivo:
              viaje?.objetivo,

            pasajeros:
              viaje?.pasajeros,

            dias:
              viaje?.dias,

            fecha_inicial:
              viaje?.fecha_inicial,

            fecha_final:
              viaje?.fecha_final,

          },

          // =====================================
          // CHOFER
          // =====================================

          chofer:
            chofer ? {

              id:
                chofer.id,

              nombres:
                chofer.nombres,

              apellidos:
                chofer.apellidos,

              celular:
                chofer.celular,

              email:
                chofer.email,

              cargo:
                chofer.cargo,

              tipo:
                chofer.tipo,

            } : null,

          // =====================================
          // ENCARGADO
          // =====================================

          encargado:
            encargado ? {

              id:
                encargado.id,

              nombres:
                encargado.nombres,

              apellidos:
                encargado.apellidos,

              celular:
                encargado.celular,

              email:
                encargado.email,

              cargo:
                encargado.cargo,

              tipo:
                encargado.tipo,

            } : null,

          // =====================================
          // VEHICULOS
          // =====================================

          vehiculos,

          // =====================================
          // RUTAS
          // =====================================

          rutas,

        };

      })

    );

    // =====================================
    // RESPONSE
    // =====================================

    return res.json({

      ok: true,

      total:
        data.length,

      data,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      ok: false,

      msg: "Error servidor",

    });

  }

};