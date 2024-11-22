const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("Tentative de connexion à MongoDB...");
    
    // Connexion à MongoDB sans les options obsolètes
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté avec succès");

    // Écoute des événements de connexion (facultatif)
    mongoose.connection.on("error", (err) => {
      console.error("Erreur de connexion à MongoDB :", err);
    });

  } catch (error) {
    console.error("Erreur de connexion à la BD :", error);
  }
}

module.exports = connectDB;



// const mongoose = require("mongoose");

// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//         console.log("MongoDB conneter avec succès");
//     })

//     connection.on("error", (err) => {
//         console.log("Erreur de connexion à MongoDB ",err);
//     })

//   } catch (error) {
//     console.log("Erreur de connexion à la BD ",error);
//   }
// }

// module.exports = connectDB;