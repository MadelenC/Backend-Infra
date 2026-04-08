import { EntitySchema, JoinColumn } from "typeorm";

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
      type: "int",
      nullable: false,
      //unique: true,
    },
    fecha_inicial: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    fecha_final: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    dias: {
      type: "int",
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
    user:{
      type: "many-to-one",
      target:"User",
      joinColumn: {
        name: "user_id", 
      },
      nullable:false,
    },
    viajes: {
    type: "one-to-many",
    target: "Viajes",
    inverseSide: "reserva",
  },
  }
});