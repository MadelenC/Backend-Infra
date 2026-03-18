import { EntitySchema, JoinColumn } from "typeorm";

export const Viajes = new EntitySchema({
  name: "Viajes", 
  tableName: "viajes", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
     tipo: {
      type: "varchar",
      nullable: false,
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
    dias: {
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
      type: "date",
      nullable: false,
      //unique: true,
    },
    fecha_final: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    estado:{
      type:"varchar",
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
    reserva: {
      type: "many-to-one",        
      target: "Reservas",         
      joinColumn: {
        name: "reserva_id",       
      },
      nullable: true,                         
    },
    // Relación inversa a presupuestos
    presupuestos: {
      type: "one-to-many",
      target: "Presupuestos",
      inverseSide: "viaje",
    },
  },
});