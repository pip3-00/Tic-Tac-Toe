const combinaciones = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const botones = document.querySelectorAll (".box");
const mensaje = document.getElementById("mensaje");
const raya = document.querySelector(".linea-ganador");
const reiniciar = document.getElementById("reiniciar");

let turno = "X";
let jugadas = 0;

// Función para mostrar el botón de reiniciar
function mostrarBotonReiniciar() {
  reiniciar.style.display = "inline-block";
}

// Función para ocultar el botón de reiniciar
function ocultarBotonReiniciar() {
  reiniciar.style.display = "none";
}

function revisarGanador() {
  for (let combo of combinaciones) {
    const a = botones[combo[0]].textContent;
    const b = botones[combo[1]].textContent;
    const c = botones[combo[2]].textContent;

    if (a && a === b && a === c) {
      mensaje.textContent = a + " ganó 🎉";
      return combo;
    }
  }
  return null;
}

function drawWinLine(comboGanador){
  // Limpiar clases anteriores
  raya.className = "linea-ganador";
  
  // Determinar tipo de línea y posición
  let tipo, posicion;
  
  // Líneas horizontales (índices consecutivos de 3 en 3)
  if (comboGanador.includes(0) && comboGanador.includes(1) && comboGanador.includes(2)) {
    tipo = "horizontal";
    posicion = 0;
  } else if (comboGanador.includes(3) && comboGanador.includes(4) && comboGanador.includes(5)) {
    tipo = "horizontal";
    posicion = 1;
  } else if (comboGanador.includes(6) && comboGanador.includes(7) && comboGanador.includes(8)) {
    tipo = "horizontal";
    posicion = 2;
  }
  // Líneas verticales (índices con diferencia de 3)
  else if (comboGanador.includes(0) && comboGanador.includes(3) && comboGanador.includes(6)) {
    tipo = "vertical";
    posicion = 0;
  } else if (comboGanador.includes(1) && comboGanador.includes(4) && comboGanador.includes(7)) {
    tipo = "vertical";
    posicion = 1;
  } else if (comboGanador.includes(2) && comboGanador.includes(5) && comboGanador.includes(8)) {
    tipo = "vertical";
    posicion = 2;
  }
  // Líneas diagonales
  else if (comboGanador.includes(0) && comboGanador.includes(4) && comboGanador.includes(8)) {
    tipo = "diagonal";
    posicion = 0;
  } else if (comboGanador.includes(2) && comboGanador.includes(4) && comboGanador.includes(6)) {
    tipo = "diagonal";
    posicion = 1;
  }
  
  // Aplicar clases
  if (tipo && posicion !== undefined) {
    raya.classList.add(tipo, `linea-${posicion}`);
    
    // Mostrar la línea con un pequeño delay para la animación
    setTimeout(() => {
      raya.style.display = "block";
    }, 300);
  }
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    boton.textContent = turno;
    boton.disabled = true;
    jugadas++;

    const comboGanador = revisarGanador();


    if (comboGanador) {
      drawWinLine(comboGanador);
      botones.forEach(b => b.disabled = true);
      mostrarBotonReiniciar(); // Mostrar botón cuando hay ganador
      return;
      
    }

    if (jugadas === 9) {
      mensaje.textContent = "Empate 🤝";
      mostrarBotonReiniciar(); // Mostrar botón en caso de empate
      return;
    }

    turno = turno === "X" ? "O" : "X";
  });
});

reiniciar.addEventListener("click", () => {
  botones.forEach(boton => {
    boton.textContent = "";
    boton.disabled = false;
  });
  raya.style.display = "none";
  raya.className = "linea-ganador"; // Resetear clases
  turno = "X";
  jugadas = 0;
  mensaje.textContent = "";
  ocultarBotonReiniciar(); // Ocultar botón al reiniciar
});

// Ocultar botón al cargar la página
ocultarBotonReiniciar();


