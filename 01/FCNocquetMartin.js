
function Usuario(nombre, apellido, libros, mascotas){    
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
    /*
    this.getFullName = function(){
        console.log(`${this.nombre}, ${this.apellido}`)
    }

    this.addMascota = function(mascota){
        this.mascotas.push(mascota)
    }

    this.getMascotas = function(){
        console.log(this.mascotas.length)
    }

    this.addBook = function(book, author){
        this.libros.push({'nombre': book, 'autor':author})
    }

    this.getBooks = function(){
        console.log(this.libros.map(x => x.nombre))
    }
    */
}

Usuario.prototype.getFullName = function(){
    console.log(`${this.nombre}, ${this.apellido}`)
}

Usuario.prototype.addMascota = function(mascota){
    this.mascotas.push(mascota)
}

Usuario.prototype.getMascotas = function(){
    console.log(this.mascotas.length)
}

Usuario.prototype.addBook = function(book, author){
    this.libros.push({'nombre': book, 'autor':author})
}

Usuario.prototype.getBooks = function(){
    console.log(this.libros.map(x => x.nombre))
}

let user1 = new Usuario("Martin", "Nocquet",[], [])

user1.getFullName()

user1.addMascota('pepe')
user1.addMascota('cosa')
user1.getMascotas()
user1.addBook('La iliada', 'Homero')
user1.addBook('Martin Fierro', 'Jose Hernandez')
user1.getBooks()
