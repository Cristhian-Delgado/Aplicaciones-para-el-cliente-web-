const formulario = document.getElementById("formulario");
const tabla = document.getElementById("tablaEstudiantes");
cargarEstudiantes();

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    let cedula = document.getElementById("cedula").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let nombres = document.getElementById("nombres").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let facultad = document.getElementById("facultad").value.trim();
    let nivel = document.getElementById("nivel").value.trim();
    let paralelo = document.getElementById("paralelo").value.trim();

    if(
        cedula === "" ||
        apellidos === "" ||
        nombres === "" ||
        direccion === "" ||
        telefono === "" ||
        correo === "" ||
        facultad === "" ||
        nivel === "" ||
        paralelo === ""
    ){
        alert("Todos los campos son obligatorios");
        return;
    }

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const regexTelefono = /^\d{10}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexNivel = /^[0-9]+$/;
    const regexParalelo = /^[A-Z]$/;

    if(!validarCedula(cedula)){
    alert("La cédula ingresada no es válida");
    return;
}

    if(!regexNombre.test(apellidos)){
        alert("Apellidos inválidos");
        return;
    }

    if(!regexNombre.test(nombres)){
        alert("Nombres inválidos");
        return;
    }

    if(!regexTelefono.test(telefono)){
        alert("Teléfono inválido");
        return;
    }

    if(!regexCorreo.test(correo)){
        alert("Correo inválido");
        return;
    }

    if(!regexNivel.test(nivel)){
        alert("Nivel inválido");
        return;
    }

    if(!regexParalelo.test(paralelo)){
        alert("Paralelo inválido. Ejemplo: A, B, C");
        return;
    }

    let estudiante = {
        cedula,
        apellidos,
        nombres,
        direccion,
        telefono,
        correo,
        facultad,
        nivel,
        paralelo
    };

    let estudiantes =
        JSON.parse(localStorage.getItem("estudiantes")) || [];

    estudiantes.push(estudiante);

    localStorage.setItem(
        "estudiantes",
        JSON.stringify(estudiantes)
    );

    formulario.reset();

    cargarEstudiantes();

    alert("Estudiante registrado correctamente");
});
function validarCedula(cedula){

    if(!/^\d{10}$/.test(cedula)){
        return false;
    }

    let provincia = parseInt(cedula.substring(0,2));

    if(provincia < 1 || provincia > 24){
        return false;
    }

    let tercerDigito = parseInt(cedula.charAt(2));

    if(tercerDigito >= 6){
        return false;
    }

    let suma = 0;

    for(let i = 0; i < 9; i++){

        let numero = parseInt(cedula.charAt(i));

        if(i % 2 === 0){

            numero *= 2;

            if(numero > 9){
                numero -= 9;
            }
        }

        suma += numero;
    }

    let decenaSuperior = Math.ceil(suma / 10) * 10;
    let digitoVerificador = decenaSuperior - suma;

    if(digitoVerificador === 10){
        digitoVerificador = 0;
    }

    return digitoVerificador === parseInt(cedula.charAt(9));
}

function cargarEstudiantes(){

    let estudiantes =
        JSON.parse(localStorage.getItem("estudiantes")) || [];

    tabla.innerHTML = "";

    estudiantes.forEach(estudiante => {

        tabla.innerHTML += `
            <tr>
                <td>${estudiante.cedula}</td>
                <td>${estudiante.apellidos}</td>
                <td>${estudiante.nombres}</td>
                <td>${estudiante.facultad}</td>
                <td>${estudiante.nivel}</td>
                <td>${estudiante.paralelo}</td>
            </tr>
        `;
    });
}