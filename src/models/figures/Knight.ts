import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
    this.setTrajectory()
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false;
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
  }

  setTrajectory(): void {
    const trajectory: Cell[] = []
    const curCell = this.cell
    
    // -2 и 2 максимально возможное расстояние хода
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const dx = curCell.x - (curCell.x - j)
        const dy = curCell.y - (curCell.y - i)
        const dxAbs = Math.abs(dx)
        const dyAbs = Math.abs(dy)
        
        if ((dxAbs === 1 && dyAbs === 2) || (dxAbs === 2 && dyAbs === 1)) {
          if (!curCell.board.checkCellInsideTheBoard(curCell.x + dx, curCell.y + dy)) continue
          trajectory.push(curCell.board.getCell(curCell.x + dx, curCell.y + dy))
        }
      }
    }

    this.trajectory = trajectory
  }
}
