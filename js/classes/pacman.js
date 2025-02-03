import {gameObject} from "./gameObject.js";
import {IMAGE_SIZE, WIDTH_CANVAS} from "../sketch.js";
import {HEIGHT_CANVAS} from "../sketch.js";
import {Food} from "./food.js";

export class pacman extends  gameObject {
  constructor(row, col) {
    super(row, col);
    this.direction = 1; //1: right, 2: down, 3: left, 4: up
    this.direction = 2;
    this.direction = 3;
    this.direction = 4;
    this.speedPacman = 32; //tamano de la imagen 32px
    this.widthCanvasPacman = 256;
    this.pacmanDiameter = 32;
  }

  moveRight() {
    let temp = this.coordXPixels + this.speedPacman;
    if (temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter) {
      console.log("No puedo moverme a la derecha");
      return;
    } else {
      this.direction = 1;
      this.coordXPixels = temp;
    }
  }

  moveLeft() {
    let temp = this.coordXPixels - this.speedPacman;
    if (temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter) {
      console.log("No puedo moverme a la izquierda");
      return;
    } else {
      this.direction = 3;
      this.coordXPixels = temp;
    }
  }

  moveUp() {
    let temp = this.coordYPixels - this.speedPacman;
    if (temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter) {
      console.log("No puedo moverme arriba");
      return;
    } else {
      this.direction = 4;
      this.coordYPixels = temp;
    }
  }

  moveDown() {
    let temp = this.coordYPixels + this.speedPacman;
    if (temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter) {
      console.log("No puedo moverme abajo");
      return;
    } else {
      this.direction = 2;
      this.coordYPixels = temp;
    }
  }

  testCollideFood(Food) {
    if (this.coordXPixels == Food.coordXPixels && this.coordYPixels == Food.coordYPixels) {
      console.log("Colision detectada");
      return true;
    }
    return false;
  }

}
