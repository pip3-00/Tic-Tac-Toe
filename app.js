const combinaciones = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const botones = document.querySelectorAll (".box");
const mensaje = document.getElementById("mensaje");
const raya = document.querySelector(".linea-ganador");
const reiniciar = document.getElementById("reiniciar");
const toggleIA = document.getElementById("toggleIA");
const selectorDificultad = document.getElementById("selectorDificultad");


let modoIA = false;
let dificultad = "facil";
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

    if (modoIA && turno === "O"){
      setTimeout(jugadaIA, 500);
    }
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

//boton ia activar y desactivar
toggleIA.addEventListener("click",() =>{
    modoIA = !modoIA;

toggleIA.textContent = modoIA
    ? "Modo IA: ACTIVADO"
    : "Modo IA: DESACTIVADO";

    selectorDificultad.disabled =!modoIA;
      selectorDificultad.style.display = modoIA ? "inline-block" : "none";
    

    reiniciar.click();
});

// cambio de dificultad
selectorDificultad.addEventListener("change", (e) => {
  dificultad = e.target.value;
  reiniciar.click();
});



//IA principal (Selector de dificultad)
function jugadaIA(){
  if(dificultad === "facil"){
    jugadaAleatoria();

  }else if (dificultad === "medio"){
    jugadaDefensiva();
  }
  else if (dificultad === "dificil"){
    jugadaDificil();
  }
}

//tablero como array logico

function obtenerTablero(){
  return[...botones].map(b => b.textContent || "");
}

//evaluar tablero

function evaluar(tablero){
  for(let combo of combinaciones){
    const [a,b,c] = combo;
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) 
  {
      return tablero[a] === "O" ? 1 : -1;
    }
  }
  if(tablero.every(c => c !== "")) return 0;
  return null;
}

//minimax

function minimax(tablero, esMaximizador, profundidad = 0){
  const resultado = evaluar(tablero);
  if (resultado !== null) return resultado - profundidad * (resultado);

  if(esMaximizador){
    let mejor = -Infinity;
    for(let i = 0; i < 9; i++){
      if(tablero[i] === ""){
        tablero[i] = "O";
        const puntaje = minimax(tablero, false, profundidad + 1);
        tablero[i] = "";
        mejor = Math.max(mejor, puntaje);
      }
    }
    return mejor;
  } else{
    let mejor = Infinity;
    for(let i = 0; i < 9; i++){
      if(tablero[i] === ""){
        tablero[i] = "X";
        const puntaje = minimax(tablero, true, profundidad + 1);
        tablero[i] = "" ;
        mejor = Math.min(mejor, puntaje);
      }
    }
    return mejor;
  }
}

// nivel dificil (95% probabilidad de victoria)
//Minimax + 5% de aleatoriedad para ser beatable
function jugadaDificil(){
  const tablero = obtenerTablero();
  
  // 5% probabilidad de jugar aleatoriamente (subóptimo)
  if (Math.random() < 0.05) {
    const movimientosPosibles = [];
    for(let i = 0; i < 9; i++){
      if (tablero[i] === "") {
        movimientosPosibles.push(i);
      }
    }
    if (movimientosPosibles.length > 0) {
      const movimientoAleatorio = movimientosPosibles[Math.floor(Math.random() * movimientosPosibles.length)];
      botones[movimientoAleatorio].click();
      return;
    }
  }
  
  // 95% probabilidad de usar minimax (jugada óptima)
  let mejorPuntaje = -Infinity;
  let mejorMovimiento = [];

  for(let i = 0; i < 9; i++){
    if (tablero[i] === ""){
      tablero[i] = "O";
      const puntaje = minimax(tablero, false, 0);
      tablero[i] = ""; 

      if(puntaje > mejorPuntaje){
        mejorPuntaje = puntaje;
        mejorMovimiento = [i];
      } else if(puntaje === mejorPuntaje){
        mejorMovimiento.push(i);
      }
    }
  }
  if(mejorMovimiento.length > 0){
    const movimiento = mejorMovimiento[Math.floor(Math.random() * mejorMovimiento.length)];
    botones[movimiento].click();
  }
}

//nivel facil (40% probabilidad de victoria)
//Más errático, a veces juega mal a propósito
function jugadaAleatoria() {
  const vacio = [...botones].filter(b => b.textContent === "");
  if (vacio.length === 0) return;

  // 60% probabilidad de jugar mal a propósito
  if (Math.random() < 0.6) {
    // Elegir una jugada que no sea la mejor (esquinas y centros secundarios)
    const indicesMalos = [1, 3, 5, 7]; // Posiciones menos estratégicas
    const movimientosPosibles = [];
    
    // Filtrar los botones vacíos que correspondan a posiciones "malas"
    for (let i = 0; i < botones.length; i++) {
      if (botones[i].textContent === "" && indicesMalos.includes(i)) {
        movimientosPosibles.push(botones[i]);
      }
    }
    
    // Si no hay movimientos "malos" disponibles, usar cualquier movimiento
    const botonSeleccionado = movimientosPosibles.length > 0 
      ? movimientosPosibles[Math.floor(Math.random() * movimientosPosibles.length)]
      : vacio[Math.floor(Math.random() * vacio.length)];
      
    botonSeleccionado.click();
    return;
  }

  // 40% probabilidad de jugar normalmente
  vacio[Math.floor(Math.random() * vacio.length)].click();
}

//nivel medio (70% probabilidad de victoria)
//Lógica defensiva + 30% de aleatoriedad
function jugadaDefensiva(){
  // 30% probabilidad de jugar aleatoriamente (erráticamente)
  if (Math.random() < 0.3) {
    jugadaAleatoria();
    return;
  }
  
  // 70% probabilidad de jugar defensivamente
  for (let combo of combinaciones) {
    const jugada = buscarJugada(combo , "O");
    if( jugada !== null){
      botones[jugada].click();
      return;
    }
    
  }
  // Si no hay jugadas defensivas, jugar aleatoriamente
  jugadaAleatoria();
}

function buscarJugada(combo, jugador) {
  const[a,b,c] = combo;
  const valores =[
    botones[a].textContent,
    botones[b].textContent,
    botones[c].textContent
  ];
  
  if (
    valores.filter( v => v === jugador).length === 2 && 
    valores.includes("")
  ) {
    return combo[valores.indexOf("")];
  }
  return null;
}
