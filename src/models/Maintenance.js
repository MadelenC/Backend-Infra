import { EntitySchema } from "typeorm";

export const Maintenance = new EntitySchema({
  name: "Maintenance", 
  tableName: "mantenimiento", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    equipo: {
      type: "varchar",
      nullable: false,
    },
    marca: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    modelo: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    numero: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
     codigo: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    otros: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    encar: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    taller: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    descripcion: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    aprobacion: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
     fecha: {
      type: "date",
      nullable: false,
      //unique: true,
    },
    fecha_inicio: {
      type: "date",
      nullable: true,
      //unique: true,
    },
    fecha_final: {
      type: "date",
      nullable: true,
      //unique: true,
    },
     responsable: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    informe: {
      type: "varchar",
      nullable: true,
      //unique: true,
    },
    cumplido: {
      type: "varchar",
      nullable: false,
      //unique: true,
    },
    id_nro: {
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
            target: "User",
            joinColumn: {
            name: "user_id",
            },
            nullable: true,
            
        },

         institucion: {
            type: "many-to-one",
            target: "Institution", 
            joinColumn: {
                name: "institucion_id",
            },
            nullable: true,
            
        },
    },
});
