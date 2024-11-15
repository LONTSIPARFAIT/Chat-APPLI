const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(req, res) {
    try {

        const { password, userId } = req.body;

        const user = await UserModel.findById(userId);

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(401).json({
                message: "Mot de passe incorrect",
                success: false,
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email,  
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn: '1d'});

        const cookieOptions = {
            http : true,
            secure : true,
        }

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: "Mot de passe correct",
            token: token,
            success: true,
        })
        
    } catch (error) {
        // Gestion des erreurs
        if (!res.headersSent) {
            return res.status(500).json({
                message: error.message || error,
                error: true
            });
        } 
    }
}

module.exports = checkPassword;