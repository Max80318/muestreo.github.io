const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = 'mongodb://localhost/edadesDB'; // Cambia esto según tu configuración de MongoDB

// Conexión a la base de datos MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Definir un modelo para las edades
const EdadSchema = new mongoose.Schema({
  edad: Number
});

const Edad = mongoose.model('Edad', EdadSchema);

// Middleware para procesar JSON
app.use(bodyParser.json());

// Ruta para agregar una edad
app.post('/agregar-edad', (req, res) => {
  const { edad } = req.body;

  if (!edad || isNaN(edad)) {
    return res.status(400).json({ error: 'La edad debe ser un número válido.' });
  }

  const nuevaEdad = new Edad({ edad });

  nuevaEdad.save()
    .then(() => {
      res.status(201).json({ message: 'Edad agregada con éxito.' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al guardar la edad.' });
    });
});

// Ruta para obtener todas las edades
app.get('/obtener-edades', (req, res) => {
  Edad.find()
    .then((edades) => {
      res.status(200).json(edades);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener las edades.' });
    });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
