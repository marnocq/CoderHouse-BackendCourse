/**
 * Desafio Entregable
 * 
 * Desarrollar un servidor en nodejs que con cada requerimiento devuelva como
 * resultado un objeto con ciertos valores aleatorios.
 */
 const http = require('http');

 function obtenerRandom(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
 }
 
 const server = http.createServer((peticion, respuesta) => {
     let producto = {
         id: obtenerRandom(1,10),
         title: "Producto " + obtenerRandom(1, 10 ),   
         price: obtenerRandom(0.00, 9999.99 ),
         thumbnail: obtenerRandom(1,10)
     }

     respuesta.end(JSON.stringify(producto))
 });
 
 server.listen(3000, function () {
     console.log(`Servidor escuchando en http://localhost:${this.address().port}`);
 });