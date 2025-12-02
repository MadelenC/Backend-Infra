import app from "./src/app.js";
import { AppDataSource } from "./src/config/data-source.js";

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado a la base de datos");
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("❌ Error de conexión:", err));
  