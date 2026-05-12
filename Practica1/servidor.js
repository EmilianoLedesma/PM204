console.log("hola mundo"); 

/* Promedio entre 2 variables */
let edad1 = 24;
let edad2 = 20;
let promedio = (edad1 + edad2) / 2;
console.log("El promedio de las edades es:", promedio);

/* Medir el tiempo en un proceso */

console.time("MiProceso")
    for(let i=0; i < 100000000; i++){}
console.timeEnd("MiProceso")

/* Objetos en tipo tabla */

let usuarios = [
    {nombre: "Emiliano", edad: 24},
    {nombre: "Diego", edad: 22},
]
console.log(usuarios)
console.table(usuarios)