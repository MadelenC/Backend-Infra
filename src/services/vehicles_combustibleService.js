import { vehicleRepository } from "../repositories/vehicleRepository.js";
import { modelosRepository } from "../repositories/modelsRepository.js";
import { marcasRepository } from "../repositories/marcsRepository.js";


export const getAllVehicles = async ({ page = 1, limit = 10, estado }) => {
  const query = vehicleRepository
    .createQueryBuilder("v")
    .leftJoinAndSelect("v.modelos", "modelos")
    .leftJoinAndSelect("modelos.marcas", "marcas")
    .leftJoinAndSelect("v.kilomecanicos", "kmec")
    .leftJoinAndSelect("v.kilomeinformes", "km")
    .orderBy("v.id", "DESC");

  if (estado) {
    query.where("v.estado = :estado", { estado });
  }

  query.skip((page - 1) * limit).take(limit);

  const [data, total] = await query.getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};


export const getResumenVehiculos = async ({ estado }) => {
  const query = vehicleRepository
    .createQueryBuilder("v")
    .leftJoin("modelos", "mo", "mo.vehiculo_id = v.id")
    .leftJoin("marcas", "ma", "ma.modelo_id = mo.id")
    .leftJoin("vehiculo_viaje", "vv", "vv.vehiculo_id = v.id")
    .leftJoin("viajes", "vi", "vi.id = vv.viaje_id")
    .leftJoin("presupuestos", "p", "p.vehiculo = v.id")
    .leftJoin("kilomecanicos", "km", "km.vehiculo_id = v.id")
    .select("v.id", "id")
    .addSelect("v.codigo", "codigo")
    .addSelect("v.placa", "placa")
    .addSelect("v.color", "color")
    .addSelect("v.tipog", "tipo")
    .addSelect("v.estado", "estado")
    .addSelect("v.combustible", "combustible")
    .addSelect("mo.tipoe", "modelo")
    .addSelect("mo.modelo", "anioModelo")
    .addSelect("COALESCE(MAX(mo.kilometraje), 0)", "kmViajes")
    .addSelect("ma.marca", "marca")
    .addSelect("COUNT(DISTINCT vi.id)", "cantidadViajes")
    .addSelect("COUNT(DISTINCT km.id)", "cantidadMantenimientos")
    .addSelect(
      "COALESCE(SUM(DISTINCT CAST(NULLIF(p.cantidad1, '') AS DECIMAL)), 0)",
      "litrosCombustible"
    )
    .addSelect(
      "COALESCE(SUM(DISTINCT CAST(NULLIF(p.total1C, '') AS DECIMAL)), 0)",
      "gastoCombustible"
    )
    .addSelect(
      "COALESCE(SUM(DISTINCT CAST(NULLIF(km.aumento, '') AS DECIMAL)), 0)",
      "kmMecanicos"
    )
    .groupBy("v.id")
    .addGroupBy("mo.tipoe")
    .addGroupBy("mo.modelo")
    .addGroupBy("ma.marca")
    .orderBy("v.id", "DESC");

  if (estado) {
    query.where("v.estado = :estado", { estado });
  }

  const data = await query.getRawMany();

  return data.map((item) => {
    const litros = Number(item.litrosCombustible || 0);
    const gasto = Number(item.gastoCombustible || 0);
    const kmViajes = Number(item.kmViajes || 0);

    return {
      ...item,
      cantidadViajes: Number(item.cantidadViajes || 0),
      cantidadMantenimientos: Number(item.cantidadMantenimientos || 0),
      litrosCombustible: litros,
      gastoCombustible: gasto,
      kmViajes,
      kmMecanicos: Number(item.kmMecanicos || 0),
      consumoPorKm: kmViajes > 0 ? Number((litros / kmViajes).toFixed(2)) : 0,
      costoPorKm: kmViajes > 0 ? Number((gasto / kmViajes).toFixed(2)) : 0,
    };
  });
};

