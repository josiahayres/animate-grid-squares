// Import stylesheets
import './style.css';
import { createGrid, determineGridSize } from './createGrid';
import { hightlightAroundTile } from './highlightAroundTile';
import { generateRandomHexColor } from './utilities';

const cellSize = 50;
const wrapper = document.getElementById('wrapper');

let selectedId = -1;
let timeoutList = [];

const handleOnClick = (index: number) => {
  timeoutList.forEach((timer) => clearTimeout(timer));
  timeoutList = [];

  createGrid({ wrapper, createTile, cellSize }); // TODO: Probably dont want to recreate a grid here. Just remove style from all cells.

  wrapper.style.backgroundColor = generateRandomHexColor();
  const oldSelectedDiv = document.getElementById(`${selectedId}`);
  if (oldSelectedDiv) oldSelectedDiv.classList.remove('selected');
  hightlightAroundTile(index, cellSize, timeoutList);
  selectedId = index;
};

const createTile = (index: number) => {
  const { columns } = determineGridSize(cellSize);
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.onclick = (e) => handleOnClick(index);
  tile.id = `${index}`;
  const inRow = Math.floor(index / columns);
  const inColumn = index % columns;
  tile.setAttribute('column', inColumn.toString());
  tile.setAttribute('row', inRow.toString());
  tile.innerText = `[${inRow}, ${inColumn}] ${index}`;
  return tile;
};

createGrid({ wrapper, createTile, cellSize });

window.onresize = () => createGrid({ wrapper, createTile, cellSize });
