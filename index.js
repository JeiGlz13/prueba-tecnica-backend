const express = require('express');
const dbConnection = require('./datebase/config');
const cors = require('cors');

require('dotenv').config();

//crear servidor 
const app = express();

//Base de datos
dbConnection();

//CORS

app.use(cors())

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/employees', require('./routes/employees'));


// Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})