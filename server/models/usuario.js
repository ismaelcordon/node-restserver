const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creamos un objeto con los roles permitidos y se lo asignamos al enumerado del rol. Si no se introduce un rol válido soltaremos error
let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let schema = mongoose.Schema;

let usuarioSchema = new schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Obtener el objeto del usuario y borramos el campo password para no lo mostrarlo en el cuerpo de la respuesta http
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema);