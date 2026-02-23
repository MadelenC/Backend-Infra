import { EntitySchema } from "typeorm";

export const Reservas = new EntitySchema({
  name: "Reservas", 
  tableName: "reservas", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    entidad: {
      type: "varchar",
      nullable: false,
    },
    objetivo: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    pasajeros: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    fecha_inicial: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    fecha_final: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    dias: {
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
});