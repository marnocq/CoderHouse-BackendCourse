const express = require('express')

const app = express() 
const fs = require('fs')

const puerto = 8080

let counterItems = 0
let counterItem = 0
// GETs
app.get('/items', (req, res) => {
    console.log('request recibido')
    try{
        const items = fs.readFileSync("./productos.txt", 'utf-8')    
        let itemsParse = JSON.parse(items)
        var obj = {"items":itemsParse, "cantidad":itemsParse.length} 
    }catch(e){
        console.log(e)
    }       
    counterItems++
    res.json(obj)
})

app.get('/item-random', (req, res) => {
    console.log('request recibido')
    try{
        const items = fs.readFileSync("./productos.txt", 'utf-8')    
        let itemsParse = JSON.parse(items)
        var obj = {"item":itemsParse[itemsParse.length * Math.random() | 0]}    
    }catch(e){
        console.log(e)
    }    
    counterItem++
    res.json(obj)
})

app.get('/visitas', (req, res) => {
    console.log('request recibido')
    res.json({visitas: {items: counterItems, item: counterItem}})
})
//Con
const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en el puerto ${server.address().port}`)
})
//err
server.on("error", error => console.log(`Error en servidor ${error}`))