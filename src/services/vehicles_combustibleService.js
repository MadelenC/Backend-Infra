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
    .addSelect("COALESCE(MAX(mo.km_ultimo_mantenimiento), 0)", "kmUltimoMantenimiento")
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
    const kmUltimoMantenimiento = Number(
      item.kmUltimoMantenimiento || 0
    );

  const kmRecorridos =
      kmViajes - kmUltimoMantenimiento;
  const limite =
    item.combustible === "Gasolina"
      ? 5000
      : 8000;
  const necesitaMantenimiento =
  kmRecorridos >= limite;

    return {
      ...item,
      cantidadViajes: Number(item.cantidadViajes || 0),
      cantidadMantenimientos: Number(item.cantidadMantenimientos || 0),
      litrosCombustible: litros,
      gastoCombustible: gasto,
      kmViajes,
      kmUltimoMantenimiento,
      kmRecorridos,
      limite,
      necesitaMantenimiento,
      kmMecanicos: Number(item.kmMecanicos || 0),
      consumoPorKm: kmViajes > 0 ? Number((litros / kmViajes).toFixed(2)) : 0,
      costoPorKm: kmViajes > 0 ? Number((gasto / kmViajes).toFixed(2)) : 0,
    };
  });
};

export const getCombustibleMensual = async (year) => {
  const data = await vehicleRepository.manager
    .createQueryBuilder()
    .from("presupuestos", "p")

    .where("p.fecha_sa >= :start AND p.fecha_sa < :end", {
      start: `${year}-01-01`,
      end: `${year + 1}-01-01`,
    })

    .leftJoin("viajes", "v", "v.id = p.viaje_id")
    .leftJoin("vehiculo_viaje", "vv", "vv.viaje_id = v.id")
    .leftJoin("vehiculos", "ve", "ve.id = vv.vehiculo_id")

    .select("EXTRACT(MONTH FROM p.fecha_sa)", "mes")
    .addSelect("ve.combustible", "combustible")

    .addSelect(
      "SUM(CAST(NULLIF(TRIM(p.cantidad1), '') AS NUMERIC))",
      "litros"
    )
    .addSelect(
      "SUM(CAST(NULLIF(TRIM(p.total1C), '') AS NUMERIC))",
      "gasto"
    )

    .groupBy("mes")
    .addGroupBy("ve.combustible")
    .orderBy("mes", "ASC")
    .getRawMany();

  return data;
};

export const getCombustibleAnual = async () => {
  const data = await vehicleRepository.manager
    .createQueryBuilder()
    .from("presupuestos", "p")

    .leftJoin("viajes", "v", "v.id = p.viaje_id")
    .leftJoin("vehiculo_viaje", "vv", "vv.viaje_id = v.id")
    .leftJoin("vehiculos", "ve", "ve.id = vv.vehiculo_id")

    .select("EXTRACT(YEAR FROM p.fecha_sa)", "anio")
    .addSelect("ve.combustible", "combustible")

    .addSelect(
      "SUM(CAST(NULLIF(TRIM(p.cantidad1), '') AS NUMERIC))",
      "litros"
    )

    .addSelect(
      "SUM(CAST(NULLIF(TRIM(p.total1C), '') AS NUMERIC))",
      "gasto"
    )

    .groupBy("anio")
    .addGroupBy("ve.combustible")
    .orderBy("anio", "ASC")

    .getRawMany();

  return data;
};