const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const getUserDetailsFromToken = async(token) => {

    if (!token){
        return {
            message : "Token manquant",
            logout : true
        };
    };

    const decode = await jwt.verify(token, process.env.JWT_SECREAT_KEY);

    const user = await UserModel.findOne({ _id : decode.id });
    // const user = await UserModel.findOne({decode,id});

    return user;
}

module.exports = getUserDetailsFromToken;