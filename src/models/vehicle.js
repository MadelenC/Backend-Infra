import { EntitySchema } from "typeorm";

export const Vehiculos = new EntitySchema({
  name: "Vehiculos", 
  tableName: "vehiculos", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    codigo: {
      type: "varchar",
      nullable: false,
    },
    placa: {
      type: "int",
      nullable: false,
      //unique: true,
    },
    color: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    pasajeros: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    tipog:{
      type:"varchar",
      nullable: false
    },
    estado:{
      type:"varchar",
      nullable: false
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    combustible:{
      type:"varchar",
      nullable: false
    },
  },
});