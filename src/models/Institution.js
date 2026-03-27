import { EntitySchema } from "typeorm";

export const Institution = new EntitySchema({
  name: "Institution", 
  tableName: "institucion", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      nullable: false,
    },
   
  },
    relations: {
    maintenances: {
      type: "one-to-many",
      target: "Maintenance",
      inverseSide: "institucion",
    },
  },
});