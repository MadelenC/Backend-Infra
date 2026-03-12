import { AppDataSource } from "../config/data-source.js";
import { departures} from "../models/departures.js";

export const departuresRepository =AppDataSource.getRepository(departures);
