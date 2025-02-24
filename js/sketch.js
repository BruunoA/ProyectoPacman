import { gameObject } from "./classes/gameObject.js";
import { pacman } from "./classes/pacman.js";
import { Food } from "./classes/food.js";
import { PowerUp } from "./classes/powerup.js"; // Importar PowerUp

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 1, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1],
  [1, 2, 1, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 1, 2, 1],
  [1, 0, 2, 2, 2, 2, 2, 1],
  [1, 3, 2, 1, 1, 1, 2, 1], // 3 es el PowerUp
  [1, 1, 1, 1, 1, 1, 1, 1],
];

const ROWS = 8;
const COLS = 8;
const extra_size = 300;
export const IMAGE_SIZE = 32;
export const WIDTH_CANVAS = COLS * IMAGE_SIZE;
export const HEIGHT_CANVAS = ROWS * IMAGE_SIZE;

let imgRock;
const arrRocks = [];

let imgFood;
const arrFood = [];

let imgPowup;
let powerUp = null; // Variable para el Power-Up

let imgPacmanUP, imgPacmanDOWN, imgPacmanLEFT, imgPacmanRIGHT;
let myPacman;

let numberImageLoaded = 0;
let startTimeGame = 0;
let timer = 0;

function preload() {
  imgRock = loadImage("img/roca.png", handleImage, handleError);
  imgFood = loadImage("img/food.png", handleImage, handleError);
  imgPacmanRIGHT = loadImage("img/pacRight.png", handleImage, handleError);
  imgPacmanDOWN = loadImage("img/pacDown.png", handleImage, handleError);
  imgPacmanLEFT = loadImage("img/pacLeft.png", handleImage, handleError);
  imgPacmanUP = loadImage("img/pacUp.png", handleImage, handleError);
  imgPowup = loadImage("img/cerezas.png", handleImage, handleError);
}

function handleError() {
  console.log("Error loading image");
}

function handleImage() {
  console.log("Image loaded");
  numberImageLoaded++;
}

function setup() {
  createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS + extra_size).parent("sketch-pacman");

  for (let rowActual = 0; rowActual < ROWS; rowActual++) {
    for (let colActual = 0; colActual < COLS; colActual++) {
      const x = colActual;
      const y = rowActual;

      if (map[rowActual][colActual] === 1) {
        const rock = new gameObject(x, y);
        arrRocks.push(rock);
      } else if (map[rowActual][colActual] === 2) {
        const food = new Food(x, y);
        arrFood.push(food);
      } else if (map[rowActual][colActual] === 0) {
        myPacman = new pacman(x, y);
      } else if (map[rowActual][colActual] === 3) {
        powerUp = new PowerUp(x, y);
      }
    }
  }
}

function draw() {
  background(135, 206, 235);

  arrRocks.forEach((rock) => rock.showObject(imgRock));
  arrFood.forEach((food) => food.showObject(imgFood));

  for (let i = 0; i < arrRocks.length; i++) {
    myPacman.testCollideRock(arrRocks[i]);
  }

  for (let i = 0; i < arrFood.length; i++) {
    let resultTest = myPacman.testCollideFood(arrFood[i]);
    if (resultTest) {
      myPacman.scorePacman += arrFood[i].pointsFood;
      arrFood.splice(i, 1);
    }
  }

  // Verificar colisión con Power-Up
  if (powerUp && myPacman.testCollidePowup(powerUp)) {
    powerUp.activate(myPacman);
    powerUp = null; // Elimina el Power-Up tras recogerlo
  }

  // Dibujar Power-Up si aún está en el mapa
  if (powerUp) {
    powerUp.showObject(imgPowup);
  }

  textSize(20);
  textAlign(CENTER, CENTER);
  timer = parseInt(millis() - startTimeGame);
  text("Score: " + myPacman.scorePacman, 150, HEIGHT_CANVAS + 50);
  text("Time: " + timer, 150, HEIGHT_CANVAS + 100);

  switch (myPacman.direction) {
    case 1:
      myPacman.showObject(imgPacmanRIGHT);
      break;
    case 2:
      myPacman.showObject(imgPacmanDOWN);
      break;
    case 3:
      myPacman.showObject(imgPacmanLEFT);
      break;
    case 4:
      myPacman.showObject(imgPacmanUP);
      break;
    default:
      myPacman.showObject(imgPacmanRIGHT);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    myPacman.moveRight();
  } else if (keyCode === LEFT_ARROW) {
    myPacman.moveLeft();
  } else if (keyCode === UP_ARROW) {
    myPacman.moveUp();
  } else if (keyCode === DOWN_ARROW) {
    myPacman.moveDown();
  }
  testFinishGame();
}

function testFinishGame() {
  if (arrFood.length === 0) {
    noLoop();
    let theconfirm = alert("Has ganado, ¿quieres jugar de nuevo?");
    if (theconfirm) {
      restartGame();
    }
  }
}

globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed = keyPressed;
