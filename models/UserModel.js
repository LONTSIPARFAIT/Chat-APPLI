const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Entrer vottre nom"]
    },
    email: {
        type : String,
        required : [true, "Entrer vottre email"],
        unique : true
    },
    password: {
        type : String,
        required : [true, "Entrer vottre mot de passe"]
    },
    profil_pic: {
        type : String,
        default : "",
        // default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    }
}, {
    timestamps: true
}
)

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;