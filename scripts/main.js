// Variable para controlar si el juego ha terminado
var juegoTerminado = false;

// Función para generar un número secreto de 5 dígitos
function numeroSecreto() {
    var numeroSecretoFun = Math.floor(Math.random() * 100000);
    numeroSecretoFun = numeroSecretoFun.toString().padStart(5, '0');
    return numeroSecretoFun;
}

// Se ejecuta cuando el documento HTML ha sido completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Genera un número secreto y lo divide en dígitos
    var numeroAleatorio = numeroSecreto();
    numeroAleatorioSeparado = numeroAleatorio.split("");
    console.log(numeroAleatorio);
});

// Contador de intentos
var intentos = 0;
// Retraso en milisegundos entre la aparición de los dígitos
var retraso = 500;

// Función para comprobar el número ingresado por el usuario
function comprobar() {
    if (!juegoTerminado) {
        // Obtiene el número ingresado por el usuario desde un campo de entrada
        var numero = document.getElementById("inputNumero").value;
        
        // Valida si el input contiene solo números de 5 dígitos
        if (/^\d{5}$/.test(numero)) {
            // Divide el número ingresado en dígitos
            let numeroSeparado = numero.split('');
            console.log(numeroSeparado);

            
            for (let i = 0; i < 5; i++) {
                // Crea un div para mostrar cada dígito y lo agrega con retraso
                setTimeout(function() {
                    
                    const divCreado = document.createElement("div");
                    divCreado.className = "celdasNuevas";
                    divCreado.innerHTML = numeroSeparado[i];
                    document.getElementById("celdasGeneradas").appendChild(divCreado);

                    if (i === 0) {
                        document.getElementById("inputComprobar").setAttribute("disabled", "true");
                    }
                    if (i === 4) {
                        // Reactiva el botón cuando se muestran los 5 recuadros
                        document.getElementById("inputComprobar").removeAttribute("disabled");
                    }
    
                    // Comprueba si el dígito es correcto (verde) o está en la posición correcta (amarillo)
                    if (numeroSeparado[i] === numeroAleatorioSeparado[i]) {
                        divCreado.style.backgroundColor = "green";
                    } else {
                        for (let j = 0; j < 5; j++) {
                            if (numeroSeparado[i] === numeroAleatorioSeparado[j]) {
                                divCreado.style.backgroundColor = "yellow";
                            }
                        }
                    }
                }, i * retraso); // Aplica el retraso para la animación
            }

            intentos++;
    
            // Comprueba si el usuario adivinó el número secreto
            if (numeroSeparado.join("") === numeroAleatorioSeparado.join("")) {
                juegoTerminado = true;
                document.getElementById("mensaje").innerHTML = "¡Has ganado! Felicidades.";
                document.getElementById("inputNumero").disabled = true;
                lanzarConfeti();
                requestAnimationFrame(mostrarGif);

            } else {
                if (intentos >= 5) {
                    juegoTerminado = true;
                    document.getElementById("mensaje").innerHTML = "No te quedan intentos, lo siento.";
                    document.getElementById("inputNumero").disabled = true;
                } else {
                    switch (intentos) {
                        case 1:
                            document.getElementById("mensaje").innerHTML = "Te quedan 4 intentos.";
                            break;
                        case 2:
                            document.getElementById("mensaje").innerHTML = "Te quedan 3 intentos.";
                            break;
                        case 3:
                            document.getElementById("mensaje").innerHTML = "Te quedan 2 intentos.";
                            break;
                        case 4:
                            document.getElementById("mensaje").innerHTML = "Te queda 1 intento.";
                            break;
                    }
                }
            }
            // Muestra el número secreto en las celdas si el juego ha terminado
            if (juegoTerminado) {
                for (let i = 0; i < 5; i++) {
                    document.getElementById("celda" + (i + 1)).innerHTML = numeroAleatorioSeparado[i];
                }
            }
        } else {
            // Muestra un mensaje de error si la entrada no es un número de 5 dígitos
            document.getElementById("mensaje").innerHTML = "Ingresa un número de 5 dígitos.";
        }
    }
    $(document).keypress(function(e){
        if (e.which == 13) {
            comprobar(); // Llama a la función comprobar() cuando se presiona Enter
        }
    });
}


function lanzarConfeti() {
    let elemento = document.getElementById("mensaje");
    // Llamar al método party.confetti con el elemento y un objeto de opciones
    party.confetti(elemento, {
        // Establecer la cantidad de confeti a 50
        count: 150,
        // Establecer la forma de confeti a estrellas
        shapes: ["square", "roundedRectangle"],
        // Establecer el color de confeti a un gradiente de rojo a amarillo
        colors: party.variation.gradientSample(party.Gradient.simple(party.Color.fromHex("#ff0000"), party.Color.fromHex("#ffff00"))),
        // Establecer la duración de la animación a 3 segundos
        duration: 3000
    });
  }

  // Define la función mostrarGif
function mostrarGif() {
    // Crea un elemento de imagen
    let gifMono = document.createElement("img");

    // Establece el atributo src al gif que quieres mostrar
    gifMono.src = "images/monkey-cymbals.gif";
    gifMono.style.position = "absolute";
    gifMono.style.top = "20%";
    gifMono.style.right = "2%";

    // Añade el elemento de imagen al documento
    document.body.appendChild(gifMono);
      // Crea un elemento de imagen
      let gifMono2 = document.createElement("img");

      // Establece el atributo src al gif que quieres mostrar
      gifMono2.src = "images/monkey-cymbals.gif";
      gifMono2.style.position = "absolute";
      gifMono2.style.top = "20%";
      gifMono2.style.left = "2%";
      
      // Añade el elemento de imagen al documento
      document.body.appendChild(gifMono2);
  }
 