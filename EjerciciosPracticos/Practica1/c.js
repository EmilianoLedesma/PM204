let nombre = prompt("Cual es tu nombre? ")
let edad = prompt("Cual es tu edad? ")

const SaludoPersonalizado = (nombre, edad) => "Hola, " + " me llamo " + nombre + " y " + "tengo " + edad + " años"

console.log(SaludoPersonalizado(nombre,edad));