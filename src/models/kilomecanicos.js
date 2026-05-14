import { EntitySchema } from "typeorm";

export const kilomecanicos = new EntitySchema({
  name: "kilomecanicos",
  tableName: "kilomecanicos",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    hay: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    aumento: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    total: {
      type: "varchar",
      length: 255,
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
    
     mecanico: {
      type: "many-to-one",
      target: "mecanicos",
      joinColumn: {
        name: "mecanico_id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },

    // RELACIÓN CON VEHÍCULO
    vehiculo: {
      type: "many-to-one",
      target: "vehiculos",
      joinColumn: {
        name: "vehiculo_id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});