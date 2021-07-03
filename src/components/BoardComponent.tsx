import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import { Colors } from '../models/Colors';
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {FigureNames} from "../models/figures/Figure";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [availableCells, setAvailableCells] = useState<Cell[]>([])
  // const [kingsPos, setKingsPos] = useState<number[][]>([[4,7],[4,0]]);

  function click(cell: Cell) {
    const selectedFigure = selectedCell?.figure
    if (selectedCell && selectedCell !== cell && selectedFigure?.canMove(cell)) {
      // if (selectedFigure?.name === FigureNames.KING)
      //   setKingsPos(selectedFigure.color === Colors.WHITE? [[cell.x, cell.y],kingsPos[1]] : [kingsPos[0],[cell.x, cell.y]])
      selectedCell.moveFigure(cell);
      swapPlayer()
      setSelectedCell(null);
      updateBoard()
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function highlightCells() {
    board.highlightCells(selectedCell)
    // updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map(cell =>
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BoardComponent;
