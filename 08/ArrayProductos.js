const express = require('express')

const app = express() 

const puerto = 8080

const productos = []
const routerProductos = express.Router()

// GET
routerProductos.get('/api/productos', (req, res) => {
    res.status(404).send(productos)
})

routerProductos.get('/spi/productos/:id', (req, res) => {
    const producto = productos.filter((producto) => producto.id == req.params.id)
    res.status(404).send(producto)
})

//POST
routerProductos.post('/api/productos', (req, res) => {
    console.table(req.body)
    const newProducto = req.body
    newProducto.id = productos.length
    personas.push(newProducto)
    res.send(newProducto)
})

app.use('/api/productos', routerProductos)

//Con
const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en el puerto ${server.address().port}`)
})
//err
server.on("error", error => console.log(`Error en servidor ${error}`))