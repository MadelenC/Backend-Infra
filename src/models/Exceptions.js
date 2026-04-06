import { EntitySchema } from "typeorm";

export const Exceptions = new EntitySchema({
  name: "Exceptions",
  tableName: "excepciones",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
     chofer_id: {
      type: "int",
      nullable: false,
    },
    tipo: {
      type: "varchar",
      nullable: false,
    },
    lugar: {
      type: "varchar",
      nullable: false,
    },
    fecha: {
      type: "date",
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
    rol: {
      type: "many-to-one",
      target: "rolTravel",
      joinColumn: {
        name: "roles_id",
      },
      nullable: false,
      eager: true,
    },
  },
});