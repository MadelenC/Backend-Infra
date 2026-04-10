import { EntitySchema } from "typeorm";

export const DestinoViaje = new EntitySchema({
  name: "DestinoViaje",
  tableName: "destino_viaje",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
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
    destino: {
      type: "many-to-one",
      target: "Destinos",
      joinColumn: {
        name: "destino_id",
      },
      nullable: false,
      
    },

    viaje: {
      type: "many-to-one",
      target: "viajes",
      joinColumn: {
        name: "viaje_id",
      },
      nullable: false,
      
    },
  },
}); 