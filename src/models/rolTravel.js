import { EntitySchema } from "typeorm";

export const Roles = new EntitySchema({
  name: "rolTravel", 
  tableName: "roles", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    tipoa: {
      type: "varchar",
      nullable: false,
    },
    tipob: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    tipoc: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    fecha: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    cantidad: {
      type: "int",
      nullable: false,
      //unique: true,
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
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "chofer_id", // indica la columna que ya existe en la tabla
      },
      nullable: false,
    },
  },
});