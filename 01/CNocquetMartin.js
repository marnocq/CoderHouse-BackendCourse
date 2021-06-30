
class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    

    getFullName(){
        console.log(`${this.nombre}, ${this.apellido}`)
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    getMascotas(){
        console.log(this.mascotas.length)
    }

    addBook(book, author){
        this.libros.push({'nombre': book, 'autor':author})
    }

    getBooks(){
        console.log(this.libros.map(x => x.nombre))
    }
}

let user1 = new Usuario("Rocket", "League",[], [])

user1.getFullName()
user1.addMascota('Thor')
user1.addMascota('Hulk')
user1.getMascotas()
user1.addBook('Los padecientes', 'Gabriel Rolon')
user1.addBook('Infinity Gauntlet', 'Marvel')
user1.getBooks()
