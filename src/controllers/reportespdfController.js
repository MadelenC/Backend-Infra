import { AppDataSource } from "../config/data-source.js";

export const reporteVehiculos = async (req, res) => {
  try {
    const vehiculosRepository =
      AppDataSource.getRepository("Vehiculos");

    const viajesRepository =
      AppDataSource.getRepository("Viajes");

    const vehiculos = await vehiculosRepository.find({
      relations: {
        modelos: true,
      },
    });

    const viajes = await viajesRepository.find({
      relations: {
        presupuestos: true,
        vehicleTravels: {
          vehiculo: true,
        },
      },
    });

    const fechaImpresion = new Date().toLocaleString("es-BO", {
  timeZone: "America/La_Paz",
  });

    const reporte = {};

   
    vehiculos.forEach((v) => {
      reporte[v.id] = {
        id: v.id,
        vehiculo: `${v.placa} - ${v.tipog}`,
        conductor: v.codigo || "",

        km_total: Number(v.modelos?.at(-1)?.kilometraje || 0),

        combustible_total: 0,
        precio: 0,
        precio_total: 0,
        pasajeros_total: 0,
        numero_viajes: 0,
      };
    });

    
    viajes.forEach((viaje) => {

  console.log("PRESUPUESTO RAW:", viaje.presupuestos);

  const vehicleTravel = viaje.vehicleTravels?.[0];
  if (!vehicleTravel) return;

  const vehiculo = vehicleTravel.vehiculo;
  if (!vehiculo) return;

  const key = vehiculo.id;

  if (!reporte[key]) return;

  viaje.presupuestos?.forEach((p) => {

    const combustible = Number(p.cantidad1 || 0);

    const precio = Number(p.precio1 || 0);

    const total = combustible * precio;

    reporte[key].combustible_total += combustible;

    reporte[key].precio_total += total;
    reporte[key].precio = precio;

  });

  reporte[key].pasajeros_total += Number(viaje.pasajeros || 0);

  reporte[key].numero_viajes += 1;

});

    const resultado = Object.values(reporte);

    // calcular los totales
    const totales = resultado.reduce(
  (acc, item) => {
    acc.combustible += Number(item.combustible_total || 0);
    acc.precio += Number(item.precio_total || 0);
    acc.pasajeros += Number(item.pasajeros_total || 0);
    acc.viajes += Number(item.numero_viajes || 0);
    return acc;
  },
  {
    combustible: 0,
    precio: 0,
    pasajeros: 0,
    viajes: 0,
  }
);

    resultado.sort((a, b) => a.id - b.id);

    const resultadoFinal = resultado.map((item, index) => ({
      nro: index + 1,

      vehiculo: item.vehiculo,
      conductor: item.conductor,

      km_total: Number(item.km_total).toFixed(2),
      combustible_total: Number(item.combustible_total).toFixed(2),
      precio: Number(item.precio).toFixed(2),
      precio_total: Number(item.precio_total).toFixed(2),
      pasajeros_total: Number(item.pasajeros_total).toFixed(2),

      numero_viajes: item.numero_viajes,
    }));



   return res.json({
  ok: true,
  data: resultadoFinal,

  totales: {
    combustible: Number(totales.combustible).toFixed(2),
    precio: Number(totales.precio).toFixed(2),
    pasajeros: Number(totales.pasajeros).toFixed(2),
    viajes: totales.viajes,
  },

  fecha: fechaImpresion,
});

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Error del servidor",
    });
  }
};