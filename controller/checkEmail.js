const UserModel = require("../models/UserModel");

async function checkEmail(req, res) {
    try {
        
        const { email } = req.body;
        
        // Rechercher l'utilisateur par email
        const checkEmail = await UserModel.findOne({ email }).select("-password");

        // Vérifiez si l'utilisateur existe
        if (!checkEmail) {
            res.status(200).json({ 
                message: "L'utilisateur n'existe pas",
                error: true
            });
        }

        // Si l'utilisateur existe, renvoyez les données
        return res.status(200).json({
            message: "Email verifier",
            success: true,
            data: checkEmail
        })

    } catch (error) {
        // Gestion des erreurs
        if (!res.headersSent) {
            return res.status(500).json({
                message: error.message || "Erreur lors de la vérification de l'email",
                error: true
            });
        }
    }
}

module.exports = checkEmail;