import { EntitySchema } from "typeorm";

export const departures = new EntitySchema({
  name: "Salidas",
  tableName: "salidas",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    lugar: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    motivo: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    responsable: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    hsalida: {
      type: "time",
      nullable: false,
    },
    hllegada: {
      type: "time",
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    vehiculo: {
      type: "many-to-one",
      target: "Vehiculos",
      joinColumn: { name: "vehiculo" },
      nullable: false,
    },
    chofer: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "chofer" },
      nullable: false,
    },
  },
});