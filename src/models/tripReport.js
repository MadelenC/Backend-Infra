import { EntitySchema } from "typeorm";

export const tripReport = new EntitySchema({
  name: "informesviajes",
  tableName: "informesviajes",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    vehiculo: {
      type: "varchar",
      nullable: true,
    },

    chofer: {
      type: "varchar",
      nullable: true,
    },

    encargado: {
      type: "varchar",
      nullable: true,
    },

    entidad: {
      type: "varchar",
      
      nullable: true,
    },

    fechapartida: {
      type: "date",
      nullable: true,
    },

    tiempopartida: {
      type: "time",
      nullable: true,
    },

    kilopartida: {
      type: "int",
      nullable: true,
    },

    fechallegada: {
      type: "date",
      nullable: true,
    },

    tiempollegada: {
      type: "time",
      nullable: true,
    },

    kilollegada: {
      type: "int",
      nullable: true,
    },

    kmtotal: {
      type: "varchar",
      nullable: true,
    },

    viaticoa: {
      type: "varchar",
     
      nullable: true,
    },

    viaticob: {
      type: "varchar",
     
      nullable: true,
    },

    viaticoc: {
      type: "varchar",
      
      nullable: true,
    },

    pasajeros: {
      type: "varchar",
      nullable: true,
    },

    dias: {
      type: "varchar",
      nullable: true,
    },

    recargue1: {
      type: "varchar",
     
      nullable: true,
    },

    compra1: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    recargue2: {
      type: "varchar",
      
      nullable: true,
    },

    compra2: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    recargue3: {
      type: "varchar",
      
      nullable: true,
    },

    compra3: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    combustotalu: {
      type: "varchar",
      
      nullable: true,
    },

    combustotalco: {
      type: "varchar",
     
      nullable: true,
    },

    descripe: {
      type: "varchar",
      nullable: true,
    },

    montope: {
      type: "varchar",
      
      nullable:true,
    },

    montoim: {
      type: "varchar",
      
      nullable: true,
    },

    totalpeim: {
      type: "varchar",
    
      nullable: true,
    },

    delegacion: {
      type: "varchar",
      nullable: true,
    },

    descripmante: {
      type: "varchar",
      nullable: true,
    },

    recomendacion: {
      type: "varchar",
      nullable: true,
    },

    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    // updated_at
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});