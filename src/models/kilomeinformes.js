import { EntitySchema } from "typeorm";

export const kilomeinformes = new EntitySchema({
  name: "kilomeinformes",
  tableName: "kilomeinformes",

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

    
    informeviaje: {
      type: "many-to-one",
      target: "informesviajes",
      joinColumn: {
        name: "informe_id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },

    
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