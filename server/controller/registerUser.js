const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');

async function registerUser(req, res) {
    try {
        const { name, email, password, profil_pic } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const checkEmail = await UserModel.findOne({ email });

        if (checkEmail) {
            return res.status(400).json({
                message: "Cet Email existe déjà",
                error: true
            });
        }

        // Hachage du mot de passe
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            profil_pic,
            password: hashedPassword,
        };

        // Créer le nouvel utilisateur
        const user = new UserModel(payload);
        const userSave = await user.save();

        return res.status(201).json({
            message: "Utilisateur enregistré avec succès",
            data: userSave,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = registerUser;