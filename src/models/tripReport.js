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
      length: 255,
      nullable: false,
    },

    chofer: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    encargado: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    entidad: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    fechapartida: {
      type: "date",
      nullable: false,
    },

    tiempopartida: {
      type: "time",
      nullable: false,
    },

    kilopartida: {
      type: "int",
      nullable: false,
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
      type: "int",
      nullable: true,
    },

    viaticoa: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    viaticob: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    viaticoc: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    pasajeros: {
      type: "varchar",
      nullable: true,
    },

    dias: {
      type: "int",
      nullable: true,
    },

    recargue1: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    compra1: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    recargue2: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    compra2: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    recargue3: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    compra3: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    combustotalu: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    combustotalco: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    descripe: {
      type: "varchar",
      nullable: true,
    },

    montope: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    montoim: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    totalpeim: {
      type: "decimal",
      precision: 10,
      scale: 2,
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

    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
});