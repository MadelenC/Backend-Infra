import { EntitySchema } from "typeorm";

export const  Mapas = new EntitySchema({
  name: "Mapas", 
  tableName: "mapas", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    titulo: {
      type: "varchar",
      nullable: false,
    },
    lat: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    lng: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    insertador: {
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
   relations: {
    user: {
      type: "many-to-one",
      target: "destinos",
      joinColumn: {
        name: "destino_id", 
      },
      nullable: false,
    },
  },
});