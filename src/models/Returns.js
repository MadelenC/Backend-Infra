import { EntitySchema } from "typeorm";

export const Returns = new EntitySchema({
  name: "Returns",
  tableName: "devoluciones",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    serial: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    fecha: {
      type: "date",
      nullable: false,
    },
    nombre: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    cantidad: {
      type: "int",
      nullable: false,
    },
    detalle: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    insertador: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    mecanico_id: {
      type: "int",
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
    mecanico: {
      type: "many-to-one",    
      target: "Mechanics",
      joinColumn: {
        name: "mecanico_id",
      },
      nullable: false,
      eager: true,
      cascade: false,
    },
  },
});