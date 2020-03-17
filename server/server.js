require('./config/config')

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// bodyParser
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

// importamos nuestro archivos de rutas de los usuarios
app.use(require('./routes/usuario'))

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err,res) => {
    if(err) throw err;

    console.log('BBDD Online')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando peticiones en el puerto: ', 3000);
})