# Tic Tac Toe con IA Mejorado

Un juego de Tres en Línea moderno con inteligencia artificial mejorada, estilos elegantes y múltiples niveles de dificultad balanceados.

## 🎮 Características

- **Interfaz moderna y elegante** con tema oscuro y efectos visuales
- **Inteligencia Artificial balanceada** con 3 niveles de dificultad
- **Controles responsivos** con animaciones y micro-interacciones
- **Experiencia de usuario mejorada** con diseño adaptativo

## 🧠 Niveles de Dificultad

### 1. **Fácil** - 40% Probabilidad de Victoria

- **Comportamiento**: Juega principalmente movimientos aleatorios
- **Lógica**: 60% de las jugadas son deliberadamente subóptimas
- **Objetivo**: Permitir al jugador ganar con relativa facilidad
- **Ideal para**: Principiantes o partidas casuales

### 2. **Medio** - 70% Probabilidad de Victoria

- **Comportamiento**: Lógica defensiva + aleatoriedad controlada
- **Lógica**: 70% de las jugadas son defensivas, 30% aleatorias
- **Estrategia**: Bloquea victorias del jugador pero comete errores ocasionales
- **Ideal para**: Jugadores con experiencia intermedia

### 3. **Difícil** - 95% Probabilidad de Victoria

- **Comportamiento**: Algoritmo Minimax con aleatoriedad mínima
- **Lógica**: 95% usa minimax perfecto, 5% jugadas aleatorias
- **Estrategia**: Casi invencible pero beatable en casos específicos
- **Ideal para**: Desafío máximo para expertos

## 🛠️ Cambios Implementados

### Correcciones de Errores

- ✅ Arreglado error tipográfico: `aadEventListener` → `addEventListener`
- ✅ Corregido valor inconsistente: `Medio` → `medio` en HTML

### Mejoras en Algoritmos de IA

#### Nivel Fácil (40% Victoria)

```javascript
// 60% probabilidad de jugar mal a propósito
if (Math.random() < 0.6) {
  // Seleccionar jugadas subóptimas
  const movimientosMalos = [1, 3, 5, 7]; // Posiciones menos estratégicas
}
// 40% probabilidad de jugar normalmente
```

#### Nivel Medio (70% Victoria)

```javascript
// 30% probabilidad de jugar aleatoriamente
if (Math.random() < 0.3) {
  jugadaAleatoria(); // Error controlado
}
// 70% probabilidad de usar lógica defensiva
for (let combo of combinaciones) {
  const jugada = buscarJugada(combo, "O");
  if (jugada !== null) {
    // Bloquear al jugador
  }
}
```

#### Nivel Difícil (95% Victoria)

```javascript
// 5% probabilidad de jugar aleatoriamente
if (Math.random() < 0.05) {
  // Jugada subóptima para ser beatable
  const movimientoAleatorio =
    movimientosPosibles[Math.floor(Math.random() * movimientosPosibles.length)];
}
// 95% probabilidad de usar Minimax perfecto
let mejorPuntaje = -Infinity;
for (let i = 0; i < 9; i++) {
  // Algoritmo minimax para jugada óptima
}
```

### Mejoras en Interfaz

#### Controles Modernos

- **Contenedor elegante** con efectos de glassmorphism
- **Botones con animaciones** y efectos hover
- **Selector desplegable** con iconos SVG personalizados
- **Responsive design** para móviles y tablets

#### Efectos Visuales

- **Animaciones de entrada** para elementos
- **Transiciones suaves** en todas las interacciones
- **Efectos de brillo** en bordes y controles
- **Tema oscuro consistente** con paleta de colores armoniosa

## 🎯 Algoritmo Minimax

El nivel difícil utiliza el algoritmo Minimax con poda Alpha-Beta:

```javascript
function minimax(tablero, esMaximizador, profundidad = 0) {
  const resultado = evaluar(tablero);
  if (resultado !== null) return resultado - profundidad * resultado;

  if (esMaximizador) {
    let mejor = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (tablero[i] === "") {
        tablero[i] = "O";
        mejor = Math.max(mejor, minimax(tablero, false, profundidad + 1));
        tablero[i] = "";
      }
    }
    return mejor;
  } else {
    let mejor = Infinity;
    for (let i = 0; i < 9; i++) {
      if (tablero[i] === "") {
        tablero[i] = "X";
        mejor = Math.min(mejor, minimax(tablero, true, profundidad + 1));
        tablero[i] = "";
      }
    }
    return mejor;
  }
}
```

## 🏗️ Arquitectura del Código

### Estructura de Archivos

```
/
├── index.html          # Estructura HTML principal
├── style.css          # Estilos CSS con tema oscuro
├── app.js            # Lógica del juego y algoritmos de IA
└── README.md         # Documentación completa
```

### Funciones Principales

#### `jugadaAleatoria()` - Nivel Fácil

- Genera movimientos aleatorios
- Introduce errores controlados para reducir dificultad

#### `jugadaDefensiva()` - Nivel Medio

- Implementa lógica defensiva básica
- Combina defensa con aleatoriedad

#### `jugadaDificil()` - Nivel Difícil

- Algoritmo Minimax optimizado
- Probabilidad controlada de errores

#### `buscarJugada()` - Lógica Defensiva

- Identifica amenazas del oponente
- Calcula jugadas defensivas

## 🎨 Paleta de Colores

```css
:root {
  --primary-bg: linear-gradient(
    135deg,
    #0f0f23 0%,
    #1a1a2e 25%,
    #16213e 50%,
    #0f0f23 100%
  );
  --secondary-bg: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  --accent-color: #8b5cf6;
  --accent-hover: #7c3aed;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  --bg-card: rgba(30, 41, 59, 0.85);
}
```

## 📱 Responsive Design

- **Desktop**: Layout completo con todos los efectos
- **Tablet**: Ajustes en espaciado y tamaños
- **Mobile**: Controles apilados verticalmente

## 🚀 Instrucciones de Uso

1. **Abrir el juego**: Abrir `index.html` en un navegador web
2. **Seleccionar dificultad**: Usar el selector desplegable
3. **Jugar contra IA**: Hacer clic en las casillas para colocar X
4. **Alternar modo**: Usar el botón para activar/desactivar IA
5. **Reiniciar**: Usar el botón "Jugar otra vez" para nueva partida

## 🎯 Probabilidades de Victoria

| Nivel       | Probabilidad IA | Estrategia Principal      |
| ----------- | --------------- | ------------------------- |
| **Fácil**   | 40%             | Aleatoriedad + errores    |
| **Medio**   | 70%             | Defensa + aleatoriedad    |
| **Difícil** | 95%             | Minimax + errores mínimos |

## 🔧 Personalización

Para modificar las probabilidades, ajustar los valores en `app.js`:

```javascript
// Nivel Fácil: Cambiar 0.6 por otro valor (0.0 - 1.0)
if (Math.random() < 0.6) {
  /* ... */
}

// Nivel Medio: Cambiar 0.3 por otro valor (0.0 - 1.0)
if (Math.random() < 0.3) {
  /* ... */
}

// Nivel Difícil: Cambiar 0.05 por otro valor (0.0 - 1.0)
if (Math.random() < 0.05) {
  /* ... */
}
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

---

**Disfruta jugando Tic Tac Toe con IA mejorada!** 🎮✨
