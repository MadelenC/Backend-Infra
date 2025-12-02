import { AppDataSource } from "../config/data-source.js";
import { User } from "../models/User.js";

export const userRepository = AppDataSource.getRepository(User);

