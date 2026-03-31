
import { EntitySchema } from "typeorm";

export const Mechanics = new EntitySchema({
  name: "Mechanics",
  tableName: "mecanicos",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    fecha: {
      type: "date",
      nullable: false,
    },

    cantidad: {
      type: "int", 
      nullable: false,
    },

    unidad: {
      type: "varchar",
      length: 50,
      nullable: false,
    },

    trabajo: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    marca: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    codigo: {
      type: "varchar",
      length: 255,
      nullable: false,
    },

    observacion: {
      type: "varchar", 
      length: 255,
      nullable: true,
    },

    kilometraje: {
      type: "int", 
      nullable: false,
    },

    insertador: {
      type: "varchar", 
      length: 255,
      nullable: false,
    },

    solicitud_id: {
      type: "int",
      nullable: false,
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

  relations: {
    solicitud: {
      type: "many-to-one",
      target: "application", 
      joinColumn: {
        name: "solicitud_id",
      },
      nullable: false,
      
    },
  },
});

