const express = require('express');
const app = express();

const cors = require('cors'); // Requiere la biblioteca cors

// Habilita CORS para todas las rutas
app.use(cors());

// Configuración de pg-promise para conectarse a PostgreSQL
const pgp = require('pg-promise')();
const connectionString = 'postgres://postgres:Fbc*gde3EDA1DCCE54*BFa5AGD4bc3**@viaduct.proxy.rlwy.net:12135/railway'; // Reemplaza 'DATABASE_URL' con tu URL de la base de datos

const db = pgp(connectionString);

// Ruta de ejemplo para realizar una consulta a la base de datos
app.get('/consultar', async (req, res) => {
    try {
        // Realiza una consulta a la base de datos
        const result = await db.any('SELECT * FROM mytable');
        res.json(result);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ error: 'Ocurrió un error al consultar la base de datos' });
    }
});

const port = process.env.PORT || 3000; // Utiliza el puerto proporcionado por el entorno o 3000 por defecto

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
