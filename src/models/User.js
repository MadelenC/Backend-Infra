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
      unique: true,
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
      unique: true
    },
    cargo:{
      type:"varchar",
      unique: true
    },
    password: {
      type: "varchar", 
      unique: true, // 🔑 campo necesario para login
    },
  },
});