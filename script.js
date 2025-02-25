// script.js
const character = document.getElementById("darth-vader");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

let posX = 128; // Posición inicial centrada horizontalmente (320/2 - 64/2)
const posY = 128; // Posición fija verticalmente (320/2 - 64/2)
let direction = "right"; // Dirección inicial
let isMoving = false; // Controlar si el personaje está en movimiento

// Función para mover el personaje
function moveCharacter(deltaX) {
  posX += deltaX;
  posX = Math.max(0, Math.min(posX, 256)); // Limitar movimiento dentro del contenedor
  character.style.left = `${posX}px`; // Mover solo en el eje X
}

// Función para detener la animación y quedarse en el último frame
function stopAnimation() {
  const currentPosition = parseInt(character.style.left, 10); // Obtener la posición actual
  const frameWidth = 64; // Ancho de cada frame
  const frameIndex = Math.floor((currentPosition % frameWidth) / frameWidth); // Calcular el frame actual

  // Determinar el último frame según la dirección
  if (direction === "right") {
    character.style.backgroundPosition = `-${frameIndex * frameWidth}px 0`;
  } else if (direction === "left") {
    character.style.backgroundPosition = `-${frameIndex * frameWidth}px -64px`;
  }

  character.style.animation = "none"; // Detener la animación
  isMoving = false;
}

// Eventos para teclado
document.addEventListener("keydown", (event) => {
  if (isMoving) return; // Evitar múltiples movimientos simultáneos

  if (event.key === "ArrowRight") {
    direction = "right";
    character.style.animation = "walk-right 0.3s steps(4) infinite"; // Animación más rápida
    isMoving = true;
  } else if (event.key === "ArrowLeft") {
    direction = "left";
    character.style.animation = "walk-left 0.3s steps(4) infinite"; // Animación más rápida
    isMoving = true;
  }
});

document.addEventListener("keyup", stopAnimation);

// Eventos para botones móviles
btnLeft.addEventListener("touchstart", () => {
  direction = "left";
  character.style.animation = "walk-left 0.3s steps(4) infinite"; // Animación más rápida
  isMoving = true;
});

btnRight.addEventListener("touchstart", () => {
  direction = "right";
  character.style.animation = "walk-right 0.3s steps(4) infinite"; // Animación más rápida
  isMoving = true;
});

btnLeft.addEventListener("touchend", stopAnimation);
btnRight.addEventListener("touchend", stopAnimation);

// Mover el personaje continuamente mientras se presiona una tecla o botón
function updatePosition() {
  if (isMoving) {
    const speed = 2; // Velocidad constante
    const deltaX = direction === "right" ? speed : -speed;
    moveCharacter(deltaX);
  }
  requestAnimationFrame(updatePosition);
}

updatePosition();
