//game constants and variables
let inputDirection = { x: 0, y: 0 };
const eatsound = new Audio("chew.mp3");
const gameoversound = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const music = new Audio("music.mp3");
let lastPaintTime = 0;
let speed = 8;

speed = prompt("Hii, Malaika here is a little gift for you.   Please enter a speed between 3 to 15 : ");
while (!(speed < 16 && speed > 2)) {
    speed = prompt("Hii, Malaika here is a little gift for you.   Please enter a speed between 3 to 15 : ");
}

let snakeArray = [
    { x: 15, y: 15 },
    { x: 14, y: 15 },
    { x: 13, y: 15 },
];

let food = {
    x: Math.floor(Math.random() * 18) + 2,
    y: Math.floor(Math.random() * 18) + 2,
};

let Score = 0;
score.innerHTML = "Score : " + Score + "</br> Speed : " + speed;

// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    //to stop this render if last paint time was too close
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide() {
    for (let i = 1; i < snakeArray.length; i++) {
        if (
            snakeArray[0].x === snakeArray[i].x &&
            snakeArray[0].y === snakeArray[i].y
        ) {
            return true;
        }
    }

    if (
        snakeArray[0].x === 0 ||
        snakeArray[0].y === 0 ||
        snakeArray[0].x > 20 ||
        snakeArray[0].y > 20
    ) {
        return true;
    }
    return false;
}

function gameEngine() {
    //step 1 : updating the snake array && food
    if (isCollide(snakeArray)) {
        gameoversound.play();
        music.pause();
        inputDirection = { x: 0, y: 0 };
        alert("Game Over! Your Score was " + Score + " at the speed of " + speed);

        speed = prompt("Hii, Malaika here is a little gift for you.   Please enter a speed between 3 to 15 : ");
        while (!(speed < 16 && speed > 2)) {
            speed = prompt("Hii, Malaika here is a little gift for you.   Please enter a speed between 3 to 15 : ");
        }
        Score = 0;
        score.innerHTML = "Score : " + Score + "</br> Speed : " + speed;
        snakeArray = [
            { x: 15, y: 15 },
            { x: 14, y: 15 },
            { x: 13, y: 15 },
        ];
        music.play();
    }

    //if snake have eaten the food, increment the food and regenerate the food
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        eatsound.play();
        Score += 1;
        score.innerHTML = "You are too cute Malaika </br> Score : " + Score + "</br> Speed : " + speed;
        snakeArray.unshift({
            x: snakeArray[0].x + inputDirection.x,
            y: snakeArray[0].y + inputDirection.y,
        });
        food = {
            x: Math.floor(Math.random() * 18) + 2,
            y: Math.floor(Math.random() * 18) + 2,
        };
    }

    // moving the snake
    if (inputDirection.x != 0 || inputDirection.y != 0) {
        let xx = {
            x: snakeArray[0].x + inputDirection.x,
            y: snakeArray[0].y + inputDirection.y,
        };
        snakeArray.unshift(xx);
        snakeArray.pop();
    }

    //step 2 : Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    //Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    music.play();
    switch (e.key) {
        case "ArrowUp":
            movesound.play();
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case "ArrowLeft":
            movesound.play();
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowDown":
            movesound.play();
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case "ArrowRight":
            movesound.play();
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
});

document.getElementById("buttonBoard").onclick = function clickEvent(e) {
    console.log(e.target.id);
    music.play();
    switch (e.target.id) {
        case "buttonUp":
            movesound.play();
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case "buttonDown":
            movesound.play();
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case "buttonLeft":
            movesound.play();
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "buttonRight":
            movesound.play();
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
};