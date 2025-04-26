const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("✅ Conectado a la base de datos"))
  .catch((error) => {
    console.error("❌ Error al conectar con la base de datos:", error.message);
    process.exit(1);
  });
