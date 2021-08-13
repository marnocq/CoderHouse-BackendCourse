// Libraries
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import handlebars from 'express-handlebars';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars({
    extname: 'handlebars',
    partialsDir: `${path.resolve()}/views/`,
}));

app.set('view engine', 'handlebars');
app.set('views', './views/');

const puerto = process.env.PORT || 8000;

server.listen(puerto, () => {
    console.log(`Servidor iniciado en el puerto: ${server.address().port}`);
});
server.on('error', error => console.log(`Error al iniciar el servidor: ${error}`));


//app.use('/', express.static(__dirname + '/public'))

let productos = [{title:"Bandera1", price:"100", thumbnail:"https://cdn4.iconfinder.com/data/icons/world-flags-12/512/Untitled-2-10-256.png", id:1},
                {title:"Bandera2", price:"200", thumbnail:"https://cdn4.iconfinder.com/data/icons/world-flags-12/512/Untitled-2-05-256.png", id:2}]
const routerProductos = express.Router()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// GET
routerProductos.get('/home', (req, res) => {    
        res.render('home', {productos: productos})    
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


