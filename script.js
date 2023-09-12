const snake = document.getElementById("snake");
const food = document.getElementById("food");

let snakeX = 2;
let snakeY = 2;
let foodX = 10;
let foodY = 10;
let gridSize = 20;
let velocityX = 0;
let velocityY = 0;
let snakeLength = 1;
let snakeTrail = [{ x: snakeX, y: snakeY }];
let tail = 1;

function update() {
    snakeX += velocityX;
    snakeY += velocityY;

    // Kollision mit Wänden
    if (snakeX < 0) snakeX = gridSize - 1;
    if (snakeX >= gridSize) snakeX = 0;
    if (snakeY < 0) snakeY = gridSize - 1;
    if (snakeY >= gridSize) snakeY = 0;

    // Kollision mit der Nahrung
    if (snakeX === foodX && snakeY === foodY) {
        snakeLength++;
        tail++;
        foodX = Math.floor(Math.random() * gridSize);
        foodY = Math.floor(Math.random() * gridSize);
    }

    // Aktualisierung der Schlange
    snakeTrail.push({ x: snakeX, y: snakeY });
    while (snakeTrail.length > snakeLength) {
        snakeTrail.shift();
    }

    // Kollision mit sich selbst
    for (let i = 0; i < snakeTrail.length - 1; i++) {
        if (snakeX === snakeTrail[i].x && snakeY === snakeTrail[i].y) {
            gameOver();
            return;
        }
    }

    // Zeichne die Schlange und die Nahrung
    snake.style.left = snakeX * gridSize + "px";
    snake.style.top = snakeY * gridSize + "px";
    food.style.left = foodX * gridSize + "px";
    food.style.top = foodY * gridSize + "px";

    // Setze das Spiel in einer Schleife fort
    setTimeout(update, 1000 / 10);
}

function gameOver() {
    alert("Spiel vorbei!");
    location.reload();
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            velocityX = 0;
            velocityY = -1;
            break;
        case "ArrowDown":
            velocityX = 0;
            velocityY = 1;
            break;
        case "ArrowLeft":
            velocityX = -1;
            velocityY = 0;
            break;
        case "ArrowRight":
            velocityX = 1;
            velocityY = 0;
            break;
    }
});

update();

