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
      nullable: true,
    },
    descripsoli: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    fecha: {
      type: "date",
      nullable: true,
      //unique: true,
    },
    
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
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
//treu a chofer y fecha por que hay un boton editar y eso ingresara esos datos , pero para probar 