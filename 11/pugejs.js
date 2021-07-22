const express = require('express')
const bodyParser = require("body-parser")
//onst exphbs = require('express-handlebars')

const app = express() 

app.set('views', './views')

/////*****CAMBIAR DE PUG A EJS PARA PROBAR LAS DISTINTAS OPCIONES*****/
//app.set('view engine', 'pug')
app.set('view engine', 'ejs')

const puerto = 8080

//app.use('/', express.static(__dirname + '/public'))

let productos = [{title:"Bandera1", price:"100", thumbnail:"https://cdn4.iconfinder.com/data/icons/world-flags-12/512/Untitled-2-10-256.png", id:1},
                {title:"Bandera2", price:"200", thumbnail:"https://cdn4.iconfinder.com/data/icons/world-flags-12/512/Untitled-2-05-256.png", id:2}]
const routerProductos = express.Router()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

// GET
routerProductos.get('/home', (req, res) => {    
        res.render('home')    
})
routerProductos.get('/productos', (req, res) => {
    res.render('tablaProductos', {productos: productos})
})

routerProductos.get('/productos/:id', (req, res) => {
    const producto = productos.filter((producto) => producto.id == req.params.id)
    if(producto.length == 0){
        res.status(404).send({error:'producto no encontrado'})
    }else{
        res.send(producto)    
    }    
})

//POST
routerProductos.post('/productos', (req, res) => {
    console.table(req.body)
    const newProducto = req.body
    newProducto.id = productos.length +1
    productos.push(newProducto)
    res.render('home')
})

//PUT
routerProductos.put('/productos/actualiza/:id', (req, res) => {   
    for (let i=0; i < productos.length; i++) {
        console.log(`for ${i}`)
        if (productos[i].id == req.params.id) {
            console.log(req.body)
            productos[i] = req.body
            productos[i].id = req.params.id
            console.log(productos)
            var productoAct = productos[i]
        }
    }
    res.send(productoAct)
})

//DELETE
routerProductos.delete('/productos/borra/:id', (req, res) => {
    const productoDel = productos.filter((producto) => producto.id == req.params.id)
    productos = productos.filter((producto) => producto.id != req.params.id)    
    res.send(productoDel)
})


app.use('/api/', routerProductos)

//Con
const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en el puerto ${server.address().port}`)
})
//err
server.on("error", error => console.log(`Error en servidor ${error}`))