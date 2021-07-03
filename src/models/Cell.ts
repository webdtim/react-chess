import {Colors} from "./Colors";
import {Figure, FigureNames} from "./figures/Figure";
import {Board} from "./Board";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // Можешь ли переместиться
  id: number; // Для реакт ключей

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random()
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if(!this.board.getCell(this.x, y).isEmpty()) {
        return false
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if(!this.board.getCell(x, this.y).isEmpty()) {
        return false
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if(absY !== absX)
      return false;

    const dy = this.y < target.y ? 1 : -1
    const dx = this.x < target.x ? 1 : -1

    for (let i = 1; i < absY; i++) {
      if(!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty())
        return false;
    }
    return true;
  }

  getVerticalAndHorisontalTrajectory(): Cell[] {
    const trajectory: Cell[] = []
    const max = this.board.length

    for (let i = 0; i < max; i++) {
      if (i !== this.x) trajectory.push(this.board.getCell(i, this.y))
      if (i !== this.y) trajectory.push(this.board.getCell(this.x, i))
    }

    return trajectory
  }

  getDiagonalTrajectory(): Cell[] {
    const trajectory: Cell[] = []
    const max = this.board.length
    const x = this.x
    const y = this.y

    // проблема как высчитывать доступные ходы, если мы потом не узнаем в массиве, последовательность клеток
    // Возможное решение использовать методы выше (isEmpty) для прохода по траектории, и если ячейка не доступна не помещаем её в список доступных ходов

    for (let i = 1; i < max; i++) {
      const lessMax = (x + i) < max
      const moreMin = (x - i) >= 0
      if (!moreMin && !lessMax) break
      if (lessMax) {
        if ((y + i) < max) trajectory.push(this.board.getCell(x + i,y + i)) //right bottom
        if ((y - i) >= 0) trajectory.push(this.board.getCell(x + i,y - i)) //r top
      }
      if (moreMin) {
        if ((y + i) < max) trajectory.push(this.board.getCell(x - i,y + i)) //left bottom
        if ((y - i) >= 0) trajectory.push(this.board.getCell(x - i,y - i)) //l top
      }
    }

    return trajectory
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.board.lostBlackFigures.push(figure)
      : this.board.lostWhiteFigures.push(figure)
  }

  moveFigure(target: Cell) {
    if(this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target)
      if (target.figure) {
        this.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      target.figure?.setTrajectory()
      this.figure = null;
    }
  }
}
