import {gameObject} from "./gameObject";

export class Food extends gameObject {
  constructor(row, col) {
    super(row, col);
    this.pointsFood=10;
  }
}
