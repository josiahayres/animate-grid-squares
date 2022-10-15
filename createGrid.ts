import { generateArrayWithNumbers } from './utilities';

interface GridProps {
  wrapper: HTMLElement;
  cellSize: number;
  createTile: (index: number) => HTMLDivElement;
}

export const determineGridSize = (cellSize: number) => {
  const columns = Math.floor(document.body.clientWidth / cellSize);
  const rows = Math.floor(document.body.clientHeight / cellSize);
  return { rows, columns, cellCount: rows * columns };
};

export const createGrid = ({ wrapper, cellSize, createTile }: GridProps) => {
  wrapper.innerHTML = '';
  const { rows, columns, cellCount } = determineGridSize(cellSize);
  wrapper.style.setProperty('--columns', columns.toString());
  wrapper.style.setProperty('--rows', rows.toString());
  console.log('rows', rows);
  console.log('columns', columns);

  const createTiles = (quantity: number) => {
    generateArrayWithNumbers(quantity).map((tileIndex) => {
      wrapper.appendChild(createTile(tileIndex));
    });
  };

  createTiles(cellCount);
};
