const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
        console.log("MongoDB conneter avec succès");
    })

    connection.on("error", (err) => {
        console.log("Erreur de connexion à MongoDB ",err);
    })

  } catch (error) {
    console.log("Erreur de connexion à la BD ",error);
  }
}

module.exports = connectDB;