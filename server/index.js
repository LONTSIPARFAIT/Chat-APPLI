const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

const PORT = process.env.PORT || 8080; 
app.get("/", (req, res) => {
    res.json({
        message: `Bienvenue sur le serveur au port ${PORT}`,
    })
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur demarré au port ${PORT} avec success`);
    })
});
