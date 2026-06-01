function verificarUsuario(Usuario){
     return new Promise((resolve, reject) => {
        if (Usuario === "admin") {
            resolve("Acceso permitido");
        } else {
            reject("Acceso denegado");
        }
    });
}

//use .then() y .catch para manejar el resultado
verificarUsuario("admin")
    .then(res => console.log(res))
    .catch(err => console.log(err));

verificarUsuario("Emiliano")
    .then(res => console.log(res))
    .catch(err => console.log(err)); //Acceso denegado