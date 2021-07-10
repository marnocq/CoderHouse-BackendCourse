const fs = require('fs')
const path = require('path');

class Archivo{
    constructor(nombre){
        this.nombre=nombre
        this.productos=[]
    }

   async leer(){           
        try{
            const contenido = await fs.promises.readFile(this.nombre, 'utf-8')            
            console.log(JSON.parse(contenido)) 
        }
        catch(err){
            console.log('No hay datos en el archivo []', err)
        }                
    }

   async guardar(producto){
       // Si antes nos se ejecuta el metodo leer se esta sobrescribiendo el archivo.
        try{
            const contenido = await fs.promises.readFile(this.nombre, 'utf-8')
            if(contenido){                                                              
                this.productos.push(JSON.parse(contenido))                
                this.productos = this.productos.flat()               
            }            
            const produ = JSON.parse(producto)
            produ.id = this.productos.length +1             
            this.productos.push(produ)
            
            await fs.promises.writeFile(this.nombre, JSON.stringify(this.productos))
            
            console.log('agregado con exito!')
        }
        catch(err){
            console.log('Ocurrio un error al intentar guardar', err)
        }
    }

    async borrar(){
        try{
            await fs.promises.unlink(this.nombre, error => {
                if (error) {
                    console.log('Ocurrio un error al intentar borrar el archivo')
                } else {
                    console.log('Se borro el archivo!')
                }
            })
        }catch(err){
            console.log('Ocurrio un error al intentar borrar el archivo')
        }    
    }
    
}
const dirPath = path.join(__dirname, '/productos.txt');
let ar = new Archivo(`${dirPath}`)

//ar.guardar('{"title":"Escuadra", "price":123.25, "thumbnail":"asdasdasd"}')
//ar.guardar('{"title":"Lapiz", "price":3.25, "thumbnail":"aaaaaaa"}')
//ar.guardar('{"title":"Cuaderno", "price":58.5, "thumbnail":"bbbbbbbb"}')
ar.leer()
//ar.borrar()
