const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TS = require('./tabla_simbolos').TS;
const {procesarBloque} =require('./interprete');
const parser = require('./gramatica');
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/analizar', (req, res) => {
    const entrada = req.body.entrada;
    let ast = parser.parse(entrada.toString());
    // Creación de una tabla de simbolos GLOBAL para iniciar con el interprete
    const tsGlobal = new TS([]);
    let results = procesarBloque(ast, tsGlobal);
    res.send({resultado:results});

});

app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});


