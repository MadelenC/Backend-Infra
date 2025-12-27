import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User", 
  tableName: "users", 
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombres: {
      type: "varchar",
    },
    apellidos: {
      type: "varchar",
    },
    cedula: {
      type: "varchar",
      unique: true,
    },
     celular: {
      type: "varchar",
      unique: true,
    },
    email:{
      type:"varchar",
      unique: true
    },
    tipo:{
      type:"varchar",
    },
    cargo:{
      type:"varchar",
    },
    password: {
      type: "varchar", 
      //unique: true, // 🔑 campo necesario para login
    },
    insertador: {
      type: "varchar",
      default: "NO"
    },
    active: {
      type: "boolean",
      default: true
    },
    // created_at
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    // updated_at
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },


  relations: {
    entidades: {
      type: "one-to-many",
      target: "Entidades",
      inverseSide: "user",
    },
  },
});