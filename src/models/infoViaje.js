import { EntitySchema } from "typeorm";

export const infoviaje = new EntitySchema({
  name: "infoviaje",
  tableName: "infoviaje",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
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
    viaje: {
      type: "many-to-one",
      target: "Viajes",
      joinColumn: {
        name: "viaje_id",
      },
     
    },

    informe: {
      type: "many-to-one",
      target: "informesviajes", 
      joinColumn: {
        name: "informeviaje_id",
      },
      
    },
},
});