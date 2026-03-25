import { EntitySchema } from "typeorm";

export const Accessories = new EntitySchema({
  name: "Accessories",
  tableName: "accesorios",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    solicitud: {
      type: "varchar",
      nullable: false,
    },

    created_at: {
      type: "timestamp",
      createDate: true,
    },

    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },

  relations: {
    solicitud: {
      type: "many-to-one",
      target: "application", 
      joinColumn: {
        name: "solicitud_id",
      },
      nullable: false,
    },
  },
});