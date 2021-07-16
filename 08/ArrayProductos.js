const express = require('express')
const bodyParser = require("body-parser")

const app = express() 

const puerto = 8080

const productos = []
const routerProductos = express.Router()
app.use(bodyParser.json())

// GET
routerProductos.get('/', (req, res) => {
    if(productos.length == 0){
        res.status(404).send({error:'no hay productos cargados'})
    }else{
        res.send(productos)
    }        
})

routerProductos.get('/:id', (req, res) => {
    const producto = productos.filter((producto) => producto.id == req.params.id)
    if(producto.length == 0){
        res.status(404).send({error:'producto no encontrado'})
    }else{
        res.send(producto)    
    }    
})

//POST
routerProductos.post('/', (req, res) => {
    console.table(req.body)
    const newProducto = req.body
    newProducto.id = productos.length + 1 
    productos.push(newProducto)
    res.send(newProducto)
})

app.use('/api/productos', routerProductos)

//Con
const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en el puerto ${server.address().port}`)
})
//err
server.on("error", error => console.log(`Error en servidor ${error}`))