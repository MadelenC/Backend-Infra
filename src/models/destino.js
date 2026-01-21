import { EntitySchema } from "typeorm";

export const destinos = new EntitySchema({
  name: "Destinos", 
  tableName: "destinos", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    dep_inicio: {
      type: "varchar",
      nullable: false,
    },
    origen: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    destino: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    dep_final: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    ruta: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    kilometraje: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    tiempo: {
      type: "date",
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
  
});