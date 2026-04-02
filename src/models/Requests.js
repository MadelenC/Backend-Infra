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
      nullable: false,
    },
    fecha: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    cantidad: {
      type: "int",
      nullable: false,
      //unique: true,
    },
    nombre: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    insertador: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    observacion: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    justificacion: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad1: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    medida1: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion1: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad2: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida2: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion2: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },  
    cantidad3: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida3: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion3: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad4: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida4: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion4: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad5: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida5: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion5: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad6: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida6: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion6: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad7: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida7: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion7: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad8: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida8: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion8: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad9: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida9: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion9: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad10: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida10: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion10: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    cantidad11: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    medida11: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion11: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    km: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    respuestas: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    conteo: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    idh: {
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