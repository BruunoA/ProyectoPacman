import {gameObject} from "./gameObject.js";
import {WIDTH_CANVAS} from "../sketch.js";
import {HEIGHT_CANVAS} from "../sketch.js";

export class pacman extends  gameObject{
  constructor(row,col) {
    super(row, col);
    this.direction=1; //1: right, 2: down, 3: left, 4: up
    this.direction=2;
    this.direction=3;
    this.direction=4;
    this.speedPacman=32; //tamano de la imagen 32px
    this.widthCanvasPacman =128;
    this.pacmanDiameter=32;
  }

  moveRight(){
    let temp = this.coordXPixels + this.speedPacman;
    if(temp < 0 || temp > this.widthCanvasPacman - this.pacmanDiameter){
      console.log("No puedo moverme a la derecha");
      return;
    }else{
      this.direction=1;
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

  moveUp(){

  }
  moveDown(){

  }

}
