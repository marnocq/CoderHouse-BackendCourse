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
        fs.unlink(this.nombre, error => {
            if(error){
                console.log('Ocurrio un error al intentar borrar el archivo')
            }else{
                console.log('Se borro el archivo!')
            }
        })

    }
    
}

let ar = new Archivo("/Users/noc/CODERHOUSE/Code/06/productos.txt")

// ar.leer()
ar.guardar('{"title":"Escuadra", "price":123.25, "thumbnail":"asdasdasd"}')
ar.guardar('{"title":"Lapiz", "price":3.25, "thumbnail":"aaaaaaa"}')
ar.guardar('{"title":"Cuaderno", "price":58.5, "thumbnail":"bbbbbbbb"}')
ar.leer()
//ar.borrar()
