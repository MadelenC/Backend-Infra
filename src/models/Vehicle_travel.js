import { EntitySchema } from "typeorm";

export const VehicleTravel = new EntitySchema({
  name: "VehicleTravel",
  tableName: "vehiculo_viaje",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
  },

  relations: {
    vehiculo: {
      type: "many-to-one",
      target: "vehiculos",
      joinColumn: {
        name: "vehiculo_id",
      },
      nullable: false,
      eager: true,
    },

    viaje: {
      type: "many-to-one",
      target: "viajes",
      joinColumn: {
        name: "viaje_id",
      },
      nullable: false,
      eager: true,
    },
  },
});