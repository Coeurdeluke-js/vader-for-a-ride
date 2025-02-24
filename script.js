// script.js
const character = document.getElementById("darth-vader");
let posX = 128; // Posición inicial centrada horizontalmente (320/2 - 64/2)
const posY = 128; // Posición fija verticalmente (320/2 - 64/2)
let direction = "right"; // Dirección inicial

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      direction = "right";
      posX = Math.min(posX + 10, 256); // Mover hacia la derecha (límite: 256px)
      character.style.animation = "walk-right 0.5s steps(4) infinite";
      break;
    case "ArrowLeft":
      direction = "left";
      posX = Math.max(posX - 10, 0); // Mover hacia la izquierda (límite: 0px)
      character.style.animation = "walk-left 0.5s steps(4) infinite";
      break;
  }
  character.style.left = `${posX}px`; // Mover solo en el eje X
});

// Detener la animación cuando no se está moviendo
document.addEventListener("keyup", () => {
  character.style.animation = "none";
});