require('dotenv').config()

const express = require('express');
const cors = require('cors')

// Crear servidor express
const app = express()

app.use(cors())

app.use( express.json())

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto", process.env.PORT);
})
