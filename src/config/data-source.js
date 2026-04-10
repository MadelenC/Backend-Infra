import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import { Entidades } from "../models/entidades.js";
import { Roles } from "../models/rolTravel.js";
import { Vehiculos } from "../models/vehicle.js";
import { destinos } from "../models/destino.js";
import { Mapas } from "../models/mapas.js";
import {Modelos} from "../models/models.js";
import {Marcas} from "../models/marcs.js";
import {Reservas} from "../models/reservas.js";
import{Viajes} from "../models/travel.js"
import { Rutas } from "../models/routes.js";
import{ departures} from "../models/departures.js"
import{ budgets} from "../models/budgets.js"
import { tripReport } from "../models/tripReport.js";
import { application } from "../models/Application.js";
import { Accessories } from "../models/Accessories.js";
import { Maintenance } from "../models/Maintenance.js";
import { Institution } from "../models/Institution.js";
import{Mechanics } from "../models/Mechanics.js";
import {Returns} from "../models/Returns.js";
import {Requests} from "../models/Requests.js";
import { Exceptions } from "../models/Exceptions.js";
import {UserTravel} from "../models/User_travel.js";
import { VehicleTravel } from "../models/vehicle_travel.js";
import { DestinoViaje } from "../models/Destino_viaje.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, 
  logging: false,                           
  poolSize:10,
  extra:{
    max:10
  },
  entities: [User, 
    Entidades, 
    Roles, 
    Vehiculos, 
    destinos, 
    Mapas, 
    Modelos, 
    Marcas, 
    Reservas,
    Viajes,
    Rutas,
    departures,
    budgets,
    tripReport,
    application,
    Accessories,
    Maintenance,
    Institution,
    Mechanics,
    Returns,
    Requests,
    Exceptions,
    UserTravel,
    VehicleTravel,
    DestinoViaje,
  ],   
});
