import { EntitySchema } from "typeorm";

export const Rutas = new EntitySchema({
  name: "Rutas", 
  tableName: "rutas", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    kilome: {
      type: "float",  
      nullable: false,
    },
    k1: {
      type: "float",
      nullable: false,
    },
    k2: {
      type: "float",
      nullable: false,
    },
    k3: {
      type: "float",
      nullable: false,
    },
    k4:{
      type:"float",
      nullable: false,
    },
    k5:{
      type:"float",
      nullable: false,
    },
    adicional:{
      type:"float",
      nullable: false,
    },
    total:{
      type:"float",
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
});