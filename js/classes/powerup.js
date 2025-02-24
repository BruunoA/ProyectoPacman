import { gameObject } from "./gameObject.js";

export class PowerUp extends gameObject {
  constructor(row, col) {
    super(row, col);
    this.active = false; // Estado del Power-Up (si ya fue recogido)
  }

  activate(pacman) {
    if (!this.active) {
      console.log("Power-Up activado: +50 puntos");
      this.active = true;
      pacman.scorePacman += 50; // Suma 50 puntos

      // Opcional: Hacer que desaparezca el Power-Up
      setTimeout(() => {
        this.active = false; // Puede reaparecer después de cierto tiempo si quieres
      }, 5000);
    }
  }
}
