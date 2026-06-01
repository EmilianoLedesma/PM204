const personas = [
    {nombre: "Emiliano", edad: 24},
    {nombre: "Ana", edad: 22},
    {nombre: "Luis", edad: 35}
]

//find() buscador de elementos
const buscador = personas.find(persona => persona.nombre === "Luis");
console.log(buscador)

//forEach itera por elementos de arreglo
personas.forEach(persona => {
    console.log(`${persona.nombre} tiene ${persona.edad} años`);
});

//Reduce() suma todas las edades
const Edades = personas.reduce((acumulador, persona) => acumulador + persona.edad,0);
console.log(Edades);