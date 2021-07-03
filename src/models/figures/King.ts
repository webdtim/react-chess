import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
    this.setTrajectory()
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false;
    if (this.isEmptyNear(target))
      return true;
    return false
  }
  
  isEmptyNear(target: Cell): boolean {
    const absX = Math.abs(target.x - this.cell.x);
    const absY = Math.abs(target.y - this.cell.y);

    if (absX > 1 || absY > 1)
      return false;
    if (absX !== 1 && absY !== 1)
      return false;

    return true
  }

  setTrajectory(): void {
    const trajectory: Cell[] = []
    const curCell = this.cell

    // -1 и 1 максимально возможное расстояние хода
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!curCell.board.checkCellInsideTheBoard(curCell.x + j,curCell.y + i)) continue
        if ((curCell.y + i) !== curCell.y 
          || (curCell.x + j) !== curCell.x)
          trajectory.push(curCell.board.getCell(curCell.x + j, curCell.y + i))
      }
    }

    this.trajectory = trajectory
  }
}
