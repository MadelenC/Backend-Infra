import { AppDataSource } from "../config/data-source.js";
import {Viajes} from "../models/travel.js"


export const viajesRepository = AppDataSource.getRepository(Viajes) ;