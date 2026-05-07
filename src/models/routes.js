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
    destino_id:{
      type: "int",
      nullable: false,
    },
    kilome: {
      type: "float",  
      nullable: false,
    },
    dest1:{
      type: "int",
      nullable: false,
    },
    k1: {
      type: "float",
      nullable: false,
    },
    dest2:{
      type: "int",
      nullable: true,
    },
    k2: {
      type: "float",
      nullable: true,
    },
    dest3:{
      type: "int",
      nullable: true,
    },
    k3: {
      type: "float",
      nullable: true,
    },
    dest4:{
      type: "int",
      nullable: true,
    },
    k4:{
      type:"float",
      nullable: true,
    },
    dest5:{
      type: "int",
      nullable: false,
    },
    k5:{
      type:"float",
      nullable: true,
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
   relations:{
    viaje: {
      type: "many-to-one",
      target: "Viajes",
      joinColumn: { name: "viaje_id" },
      nullable: false,
    },
   }
});