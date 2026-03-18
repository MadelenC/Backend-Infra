import { EntitySchema } from "typeorm";

export const budgets = new EntitySchema({
  name: "Presupuestos",
  tableName: "presupuestos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    vehiculo: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    chofer: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    encargado: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    entidad: {
      type: "varchar",
      nullable: false,
    },
    fecha_sa: {
      type: "date",
      nullable: false,
    },
    division1: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    combustible1: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    cantidad1: {
      type: "varchar",
      nullable: false,
    },
    carta1: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    precio1: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    total1C: {
      type: "varchar",
      nullable: false,
    },
    cantidad2: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    precio2: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    total2VC: {
      type: "varchar",
      nullable: false,
    },
    cantidad3: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    precio3: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    total3VP: {
      type: "varchar",
      nullable: false,
    },
    cantidad4: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    precio4: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    total4VF: {
      type: "varchar",
      nullable: false,
    },
    cantidad5: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    precio5: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    total5P: {
      type: "varchar",
      nullable: false,
    },
    cantidad6: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    precio6: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    total6M: {
      type: "varchar",
      nullable: false,
    },
    cantidad7: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    precio7: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    total7G: {
      type: "varchar",
      nullable: false,
    },
    total8T: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    responsable: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    materia: {
      type: "varchar",
      nullable: false,
    },
    sigla: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    ndocentes: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    hsalida: {
      type: "varchar",
      nullable: false,
    },
    hllegada: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    p1: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    r1: {
      type: "varchar",
      nullable: false,
    },
    c1: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    t1: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    p2: {
      type: "varchar",
      nullable: false,
    },
    r2: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    c2: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    t2: {
      type: "varchar",
      nullable: false,
    },
    p3: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    c3: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    t3: {
      type: "varchar",
      nullable: false,
    },
    tt: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    diferencia: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    nota: {
      type: "varchar",
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
   relations: {
    viaje: {
      type: "many-to-one",
      target: "Viajes",
      joinColumn: { name: "viaje_id" },
      nullable: false,
    },
  },
  
});