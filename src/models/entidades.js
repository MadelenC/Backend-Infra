import { EntitySchema } from "typeorm";

export const Entidades = new EntitySchema({
  name: "Entidades", 
  tableName: "entidades", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    facultad: {
      type: "varchar",
      nullable: false,
    },
    carrera: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    materia: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    sigla: {
      type: "varchar",
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
        name: "user_id", // indica la columna que ya existe en la tabla
      },
      nullable: false,
    },
  },
});

