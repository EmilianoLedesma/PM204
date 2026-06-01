const persona = {
    nombre: "Emiliano Ledesma",
    edad: 24,
    direccion: {
        ciudad: "Qro",
        pais: "Mexico"
    }
};

const {nombre, edad, direccion: {ciudad}} = persona;

console.log(`Hola, me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}`);

