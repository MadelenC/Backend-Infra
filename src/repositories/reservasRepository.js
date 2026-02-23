import { AppDataSource } from "../config/data-source.js";
import {Reservas} from "../models/reservas.js"


export const reservasRepository = AppDataSource.getRepository(Reservas) ;