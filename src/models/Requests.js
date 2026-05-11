import { EntitySchema } from "typeorm";

export const Requests = new EntitySchema({
  name: "Requests", 
  tableName: "peticiones", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    orden: {
      type: "int",
      nullable: true,
    },
    fecha: {
      type: "date",
      nullable: true,
      //unique: true,
    },
    cantidad: {
      type: "int",
      nullable: true,
      //unique: true,
    },
    nombre: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    insertador: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    observacion: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    justificacion: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad1: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida1: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion1: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad2: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida2: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion2: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },  
    cantidad3: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida3: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion3: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad4: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida4: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion4: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad5: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida5: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion5: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad6: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida6: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion6: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad7: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida7: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion7: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad8: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida8: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion8: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad9: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida9: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion9: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad10: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida10: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion10: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cantidad11: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    medida11: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    descripcion11: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    km: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    respuestas: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    conteo: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    idh: {
      type: "varchar",
      nullable: true,
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
  solicitud: {
    type: "many-to-one",
    target: "application",
    joinColumn: {
      name: "solicitud_id", 
    },
    nullable: false,
  },
}
});