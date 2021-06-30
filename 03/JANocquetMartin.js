// muestra las palabras en orden a partir de un texto
const mostrarPalabras = (texto, tiempo, cantidadPalabras, callback) => {
    let cant_palabras = cantidadPalabras
    let palabras = texto.split(" ")    
    let index = 0
    let maxIndex = palabras.length
    let intervalo = setInterval(()=>{
        console.log(palabras[index])
        index++
        cant_palabras++
        if(maxIndex == index){
            clearInterval(intervalo)
            callback(null, cant_palabras)
        }        
    }, tiempo)      
}

let texto1 = 'Contrary to popular belief';
let texto2 = 'Lorem Ipsum is not';
let texto3 = 'simply random text';
const tiempo = 1000;
 
mostrarPalabras(texto1, tiempo, 0, (error, totalPalabras) => {
    mostrarPalabras(texto2, tiempo, totalPalabras, (error, totalPalabras) => {
        mostrarPalabras(texto3, tiempo, totalPalabras, (error, totalPalabras) => {
            console.log('Proceso terminado, cantidad de palabras:', totalPalabras);
        });
    });
});