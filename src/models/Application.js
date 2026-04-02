import { EntitySchema } from "typeorm";

export const application = new EntitySchema({
  name: "application", 
  tableName: "solicitudes", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    chofer: {
      type: "varchar",
      nullable: false,
    },
    descripsoli: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    fecha: {
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
   relations: {
      vehiculo: {
        type: "many-to-one",
        target: "Vehiculos", 
        joinColumn: {
          name: "vehiculo_id",
        },
        nullable: false,
      },
       accesorios: {
      type: "one-to-many",
      target: "Accessories",
      inverseSide: "solicitud",
      },
      peticiones: {
      type: "one-to-many",
      target: "Requests",
      inverseSide: "solicitud",
      },
  
    },
});