import React, {FC} from 'react';
import {Cell} from "../models/Cell";
import {FigureNames} from "../models/figures/Figure";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  let cellBackgroundColor = ''
  if (cell.available && cell.figure) {
    cellBackgroundColor = cell.figure.name === FigureNames.KING? 'red' : 'green'
  }

  return (
    <div
      className={['cell', cell.color, selected ? "selected" : ''].join(' ')}
      onClick={() => click(cell)}
      style={{background: cellBackgroundColor}}
    >
      {cell.available && !cell.figure && <div className={"available"}/>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
    </div>
  );
};

export default CellComponent;
