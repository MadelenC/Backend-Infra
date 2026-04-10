  import express from "express";
  import cors from "cors";
  import dotenv from "dotenv";
  import userRoutes from "./routes/userRoutes.js";
  import authRoutes from "./routes/authRoutes.js"; 
  import entidadesRoutes from "./routes/entidadesRoutes.js";
  import rolTravelRoutes from "./routes/rolTravelRoutes.js";
  import vehicleRoutes from "./routes/vehicleRoutes.js";
  import destinoRoutes from "./routes/destinoRoutes.js";
  import mapasRoutes from "./routes/mapasRoutes.js"
  import modelosRoutes from "./routes/modelsRoutes.js"
  import marcasRoutes from "./routes/marcsRoutes.js"
  import reservaRoutes from "./routes/reservasRoutes.js"
  import travelRoutes from "./routes/travelRoutes.js"
  import routesRoutes from "./routes/routesRoutes.js"
  import departuresRoutes from "./routes/departuresRoutes.js"
  import budgetsRoutes from "./routes/budgetsRoutes.js"
  import tripsReportRoutes from "./routes/tripReportRoutes.js"
  import applicationRoutes from "./routes/applicationRoutes.js"
  import accessoriesRoutes from "./routes/accesoriesRoutes.js"
  import maintenanceRoutes from "./routes/maintenanceRoutes.js"
  import institutionRoutes from "./routes/institutionRoutes.js"
  import mechanicsRoutes from "./routes/mechanicsRoutes.js"
  import returnsRoutes from "./routes/retunrsRoutes.js"
  import requestRoutes from "./routes/requestRoutes.js"
  import exceptionsRoutes from "./routes/exceptionsRoutes.js"
  import user_travelRoutes   from "./routes/user_travelRoutes.js";
  import vehicle_travelRoutes from "./routes/vehicle_travelRoutes.js"
  import destino_viajeRoutes from "./routes/destino_viajeRoutes.js"
  dotenv.config();

  const app = express();
  app.use(express.json());

  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    Credential: true
  }));

  // Rutas
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes); 
  app.use("/api/entidades", entidadesRoutes);
  app.use("/api/rolTravel", rolTravelRoutes);
  app.use("/api/vehicle", vehicleRoutes); 
  app.use("/api/destino", destinoRoutes);
  app.use("/api/mapas", mapasRoutes);
  app.use("/api/modelos", modelosRoutes);
  app.use("/api/marcas", marcasRoutes);
  app.use("/api/reservas",reservaRoutes);
  app.use("/api/viajes", travelRoutes);
  app.use("/api/rutas", routesRoutes);
  app.use("/api/salidas", departuresRoutes);
  app.use("/api/presupuestos", budgetsRoutes);
  app.use("/api/informe_viajes", tripsReportRoutes);
  app.use("/api/solicitudes",applicationRoutes);
  app.use("/api/accesorios",accessoriesRoutes);
  app.use("/api/mantenimiento",maintenanceRoutes);
  app.use("/api/institucion",institutionRoutes);
   app.use("/api/mecanicos",mechanicsRoutes);
  app.use("/api/devoluciones",returnsRoutes);
  app.use("/api/peticiones",requestRoutes);
  app.use("/api/excepciones",exceptionsRoutes);
  app.use("/api/userviaje",user_travelRoutes );
  app.use("/api/vehicletravel",vehicle_travelRoutes);
  app.use("/api/destinoviaje",destino_viajeRoutes);
  export default app;