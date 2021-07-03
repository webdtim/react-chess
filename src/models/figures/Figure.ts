import logo from '../../assets/black-king.png'
import {Colors} from "../Colors";
import {Cell} from "../Cell";
// import {Board} from "../Board";

export enum FigureNames {
  FIGURE = "Фигура",
  KING = "Король",
  KNIGHT = "Конь",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  BISHOP = "Слон",
}

class animal {
  function breath() {
    console.log('я дышу')
  }
}

class dog extends animal {
  say: 'гав'
]

export class Figure {
  availableSlotsToMove: Cell[];
  trajectory: Cell[];
  cell: Cell;
  logo: typeof logo | null;
  color: Colors;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.availableSlotsToMove = [];
    this.trajectory = [];
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.color = color;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell) : boolean {
    if(target.figure?.color === this.color)
      return false;
    // if(target.figure?.name === FigureNames.KING) {
    //   return false;
    // }
    return true;
  }

  setTrajectory() {}
  moveFigure(target: Cell) {}
}
