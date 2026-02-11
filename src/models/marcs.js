import { EntitySchema } from "typeorm";

export const Marcas = new EntitySchema({
  name: "Marcas", 
  tableName: "marcas", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    marca: {
      type: "varchar",
      nullable: false,
    },
    chasis: {
      type: "varchar",
      nullable: false,
    },
    motor: {
      type: "varchar",
      nullable: false,
    },
    cilindrada: {
      type: "varchar",
      nullable: false,
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
    modelo: {
      type: "many-to-one",
      target: "Modelos",      
      joinColumn: { name: "modelo_id" },  
      nullable: false,
    },
  },
});
