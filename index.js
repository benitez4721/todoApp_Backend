require('dotenv').config()
const { dbconnection } = require('./database/config')
const express = require('express');
const cors = require('cors')

// Crear servidor express
const app = express()

app.use(cors())

app.use( express.json())

dbconnection()

//Rutas
app.use( '/api/users', require('./routes/usuarios'))
app.use( '/api/tasks', require('./routes/tareas'))
app.use( '/api/teams', require('./routes/teams'))
app.use( '/api/login', require('./routes/auth'))

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto", process.env.PORT);
})
