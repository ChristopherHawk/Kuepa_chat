const {Schema, model}= require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
    nombre: { type: String, required: true, unique: true},
    contraseña: { type: String, required: true},
}, {
    timestamps: true
});

//cifrado de contraseña

UserSchema.methods.encryptPassword = async contraseña =>{

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contraseña, salt);

};

//validación de contraseña

UserSchema.methods.matchPassword = async function (contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = model('User', UserSchema);