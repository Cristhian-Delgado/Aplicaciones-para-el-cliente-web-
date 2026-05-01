alert("Calculadora");
function ejecutarOperaciones() {
    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    let salida = "";

    if (isNaN(n1) || isNaN(n2)) {
        salida = "Por favor ingrese valores válidos.";
    } else {
        for (let i = 1; i <= 5; i++) {
            switch(i) {
                case 1:
                    salida += "<p>1. SUMA: " + (n1 + n2) + "</p>";
                    break;
                case 2:
                    salida += "<p>2. RESTA: " + (n1 - n2) + "</p>";
                    break;
                case 3:
                    salida += "<p>3. MULTIPLICACIÓN: " + (n1 * n2) + "</p>";
                    break;
                case 4:
                    if (n2 !== 0) {
                        salida += "<p>4. DIVISIÓN: " + (n1 / n2) + "</p>";
                    } else {
                        salida += "<p>4. DIVISIÓN: No se puede dividir para 0</p>";
                    }
                    break;
                case 5:
                    salida += "<p>5. MOD (%): " + (n1 % n2) + "</p>";
                    break;
            }
        }
    }
    document.getElementById("resultado").innerHTML = salida;
}