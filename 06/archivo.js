const fs = require('fs')

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
            console.log('[]', err)
        }                
    }

   async guardar(producto){
       // Si antes nos se ejecuta el metodo leer se esta sobrescribiendo el archivo.
        try{
            const produ = JSON.parse(producto)
            produ.id = this.productos.length +1             
            this.productos.push(produ)
            console.log("esto es del console log"+this.productos)
            await fs.promises.writeFile(this.nombre, JSON.stringify(this.productos))
            console.log('agregado con exito!')
        }
        catch(err){
            console.log('Ocurrio un error al intentar guardar', err)
        }
    }

    borrar(){
        // Usar promesas con async/await y manejo de errores con try/catch
        fs.unlink(this.nombre, error => {
            if(error){
                console.log('Ocurrio un error al intentar borrar el archivo')
            }else{
                console.log('Se borro el archivo!')
            }
        })

    }
    
}

// Aca es donde tenes que user el __dirname. Eso te va a cargar la ruta absoluta hasta la carpeta donde se encuentre este archivo
let ar = new Archivo("/Users/noc/CODERHOUSE/Code/06/productos.txt")

// ar.leer()
ar.guardar('{"title":"Escuadra", "price":123.25, "thumbnail":"asdasdasd"}')
ar.guardar('{"title":"Lapiz", "price":3.25, "thumbnail":"aaaaaaa"}')
ar.guardar('{"title":"Cuaderno", "price":58.5, "thumbnail":"bbbbbbbb"}')
ar.leer()
//ar.borrar()
