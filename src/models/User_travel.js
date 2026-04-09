import { EntitySchema } from "typeorm";

export const UserTravel = new EntitySchema({
  name: "UserTravel",
  tableName: "user_viaje",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "users",
      joinColumn: {
        name: "user_id",
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