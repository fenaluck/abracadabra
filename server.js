const express = require('express');
const app = express()
app.use(express.json());
app.use(express.static('static'))
app.use(express.static('assets'))


//cargar los archivos estaticos
const usuarios = ['Pablo', 'Pedro', 'Juan', 'Carlos', 'Rodrigo', 'Nelson']

app.get("/abracadabra/:usuarios", (req, res) => {
    return res.json(usuarios)
});
// Paso 1 determinar la ruta 
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    //guardar el usuario
    const usuario = req.params.usuario
    //buscamos al usuario
    const eleccion = usuarios.find(e => e == usuario)
    //comprobamos si el usuario existe
    if(eleccion){
        return next()
    }
    res.redirect('/who.jpeg')
});
// Paso 1 determinar la ruta parametrizada
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
    res.send(`Hola!!! estimado ${req.params.usuario} como estas, espero que te alla gustado esta aplicacion`)
    
});

// Paso 1 determinar la ruta parametrizada
app.get("/abracadabra/conejo/:n", (req, res) => {
        // Paso 2 determinar la eleccion al azar
    const eleccion = Math.floor(Math.random() * 4);
        // Paso 3 guardar el numero
    const numero = req.params.n;
        // Paso 3 comparar y entregrar el resultado
    numero == eleccion
        ?  res.redirect('/conejito.jpg')
        :  res.redirect('/voldemort.jpg');
});

// Paso 1 determinar la ruta generica
app.get('*', (req, res) => {
    // responder la no existencia de rutas
    res.send('Esta ruta no existe')
});

app.listen(3001, () => {
    console.log(`Server started on port 3001`);
});