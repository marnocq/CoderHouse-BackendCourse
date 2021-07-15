const express = require('express')

const app = express() 

const puerto = 8080

const productos = []
const routerProductos = express.Router()

// GET
routerProductos.get('/api/productos', (req, res) => {
    res.status(404).send(productos)
})

routerProductos.get('/api/productos/:id', (req, res) => {
    const producto = productos.filter((producto) => producto.id == req.params.id)
    res.status(404).send(producto)
})

//POST
routerProductos.post('/api/productos', (req, res) => {
    console.table(req.body)
    const newProducto = req.body
    newProducto.id = productos.length
    productos.push(newProducto)
    res.send(newProducto)
})

//PUT
routerProductos.put('/api/productos/:id', (req, res) => {
    const productoAct = productos.filter((producto) => producto.id == req.params.id)
    for (let i=0; i < productos.length; i++) {
        console.log(`for ${i}`)
        if (productos[i].id == req.params.id) {
            console.log(req.body)
            productos[i] = req.body
            console.log(productos)
        }
    }
    res.send(productoAct)
})

//DELETE
routerProductos.delete('/api/productos/:id', (req, res) => {
    productos = productos.filter((producto) => producto.id != req.params.id)
    const productoDel = productos.filter((producto) => producto.id == req.params.id)
    res.send(productoDel)
})


app.use('/api/productos', routerProductos)

//Con
const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en el puerto ${server.address().port}`)
})
//err
server.on("error", error => console.log(`Error en servidor ${error}`))