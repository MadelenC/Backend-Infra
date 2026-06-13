import { EntitySchema } from "typeorm";

export const Modelos = new EntitySchema({
  name: "Modelos",
  tableName: "modelos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    modelo: {
      type: "varchar",
      nullable: false,
    },
    tipoe: {
      type: "varchar",
      nullable: false,
    },
    kilometraje: {
      type: "double precision",
      nullable: false,
    },
    km_ultimo_mantenimiento: {
      type: "double precision",
      nullable: false,
      default: 0,
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
      joinColumn: {
        name: "vehiculo_id"
      },
      inverseSide: "modelo",
      nullable: false
    },
     marcas: {              
      type: "one-to-many",
      target: "Marcas",
      inverseSide: "modelo"
    }
  }
});
