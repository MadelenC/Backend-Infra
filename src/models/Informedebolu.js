import { EntitySchema } from "typeorm";

export const Informedebolu = new EntitySchema({
  name: "Informedebolu",
  tableName: "informesdebolu",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    combus: {
      type: "varchar",
      nullable: true,
    },

    peaje: {
      type: "varchar",
      nullable: true,
    },

    impre: {
      type: "varchar",
      nullable: true,
    },

    totalcopeim: {
      type: "varchar",
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    // updated_at
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },

  relations: {
    informeviaje: {
      type: "many-to-one",
      target: "informesviajes",
      joinColumn: {
        name: "informesviaje_id",
      },
      nullable: false,
      inverseSide: "informesdebolu",
    },
  },
});