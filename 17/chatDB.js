// Libraries
/*import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import handlebars from 'express-handlebars';
import http from 'http';
import {Server} from 'socket.io';
import fs from 'fs';
import knexSqlite from './database/knexSqlite.js';
import knexMariadb from './database/knexMariadb.js';
*/
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
//const http = require('http').Server(app);
//const app = express();
//const io = require('socket.io')(http);

//app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());
const server = require('http').createServer(app);
//const io = new Server(server);
const io = require('socket.io')(server);

app.engine("handlebars", handlebars({
    extname: 'handlebars',
    partialsDir: './views/', 
}));

app.set('view engine', 'handlebars');
app.set('views', './views/');

const puerto = process.env.PORT || 8000;

io.on('connection', function(socket){
    console.log('Un cliente se ha conectado');
    socket.emit('notification', {message:"hi"});
});

server.listen(puerto, () => {
    console.log(`Servidor iniciado en el puerto: ${server.address().port}`);
});
server.on('error', error => console.log(`Error al iniciar el servidor: ${error}`));


//app.use('/', express.static(__dirname + '/public'))

let productos = [{title:"Bandera1", price:"100", thumbnail:"https://cdn4.iconfinder.com/data/icons/world-flags-12/512/Untitled-2-10-256.png", id:1},
                {title:"Bandera2", price:"200", thumbnail:"https://cdn4.iconfinder.com/data/icons/world-flags-12/512/Untitled-2-05-256.png", id:2}]

/*
try{
    fs.readFileSync('./data/mensajes.json');
}
catch(error){
    fs.writeFileSync('./data/mensajes.json', JSON.stringify([])); 
}
*/
const knexSql = require('./database/knexSqlite');

try{
    var mensajes = JSON.parse( knexSql.from('mensajes').select('mensaje', 'email', 'fecha')
                        .then((rows) =>{
                            for (row of rows) {
                                console.log(`${row['fecha']} ${row['email']} ${row['mensaje']}`)
                            }
                        })
                        .catch((err) => {console.log(err); throw err})
                        .finally(() => {
                            //knexSql.destroy();
                        })    
                    )
}
catch{
    var mensajes = []
}
//let mensajes = JSON.parse(fs.readFileSync('./data/mensajes.json'));



const routerProductos = express.Router()
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded())


const knexMdb = require('./database/knexMariadb');
// GET
routerProductos.get('/home', (req, res) => {    
        res.render('home', {productos: productos, chat: mensajes})    
})
// routerProductos.get('/productos', (req, res) => {
//     res.render('tablaProductos', {productos: productos})
// })

// routerProductos.get('/productos/:id', (req, res) => {
//     const producto = productos.filter((producto) => producto.id == req.params.id)
//     if(producto.length == 0){
//         res.status(404).send({error:'producto no encontrado'})
//     }else{
//         res.send(producto)    
//     }    
// })

//POST
routerProductos.post('/productos', (req, res) => {
    console.table(req.body)
    const newProducto = req.body
    newProducto.id = productos.length +1
    productos.push(newProducto)    
    io.emit('new-product', newProducto);
    //res.render('home',{productos: productos})
    res.send('succes');
})

/***MENSAJES****/



routerProductos.post('/chat', (req, res) => {   
    console.table(req.body)
    const newChatMsg = req.body   
    newChatMsg.fecha = new Date().toLocaleString()
    mensajes.push(newChatMsg)
    //persistencia en base sqlite3
    knexSql('mensajes').insert(newChatMsg)
        .then(() => console.log("mensaje insertado"))
        .catch((err) => {console.log(err); throw err})
        .finally(() =>{
           // knexSql.destroy();
        });
    //fs.writeFileSync('./data/mensajes.json', JSON.stringify(mensajes));
    io.emit('new-msg', newChatMsg)
    res.send('succes')
})

// io.on('connection', (socket) => {
//     /* Recibimos en el back */
//     socket.on('msg-new', (data) => {
//         console.log(data);
//     });
// });

// //PUT
// routerProductos.put('/productos/actualiza/:id', (req, res) => {   
//     for (let i=0; i < productos.length; i++) {
//         console.log(`for ${i}`)
//         if (productos[i].id == req.params.id) {
//             console.log(req.body)
//             productos[i] = req.body
//             productos[i].id = req.params.id
//             console.log(productos)
//             var productoAct = productos[i]
//         }
//     }
//     res.send(productoAct)
// })

// //DELETE
// routerProductos.delete('/productos/borra/:id', (req, res) => {
//     const productoDel = productos.filter((producto) => producto.id == req.params.id)
//     productos = productos.filter((producto) => producto.id != req.params.id)    
//     res.send(productoDel)
// })


app.use('/api/', routerProductos)


