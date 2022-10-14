// Import stylesheets
import './style.css';

const cellSize = 50;
const wrapper = document.getElementById('wrapper');
let columns = Math.floor(document.body.clientWidth / cellSize);
let rows = Math.floor(document.body.clientHeight / cellSize);

let selectedId = -1;
let timeoutList = [];

const generateRandomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

const hightlightTile = (tileIndex: number) => {
  const divToHighlight = document.getElementById(`${tileIndex}`);
  if (divToHighlight) divToHighlight.classList.add('selected');
};

const generateArrayWithNumbers = (numberOfItems: number) => {
  return Array.from(Array(numberOfItems), (undefined, i) => i);
};

const hightlightAroundTile = (tileIndex: number) => {
  const columnsBefore = tileIndex > columns ? tileIndex % columns : tileIndex;
  const columnsAfter = columns - 1 - columnsBefore;
  const rowsBefore = tileIndex >= columns ? Math.floor(tileIndex / columns) : 0;
  const rowsAfter = rows - 1 - rowsBefore;

  const max = Math.max(columnsBefore, columnsAfter, rowsBefore, rowsAfter);
  console.log('max', max);

  let a = new Set<number>();

  generateArrayWithNumbers(max + 1).map((ind1) => {
    console.log(ind1);
    const newTimer = setTimeout(() => {
      const TM1 = tileIndex - columns * ind1;
      const BM1 = tileIndex + columns * ind1;
      const MR1 = tileIndex + ind1;
      const ML1 = tileIndex - ind1;

      [TM1, BM1, MR1, ML1].forEach((num) => a.add(num));

      generateArrayWithNumbers(ind1).map((ind2) => {
        a.add(TM1 - ind2 - 1);
        a.add(TM1 + ind2 + 1);
        a.add(BM1 - ind2 - 1);
        a.add(BM1 + ind2 + 1);
        generateArrayWithNumbers(ind2).map((ind3e) => {
          const ind3 = ind3e + 1;
          a.add(MR1 + columns * ind3);
          a.add(MR1 - columns * ind3);
          a.add(ML1 + columns * ind3);
          a.add(ML1 - columns * ind3);
        });
      });

      const cellsToUpdate = [...a];
      cellsToUpdate.forEach((eachCellId) => hightlightTile(eachCellId));
    }, 50 * ind1);
    timeoutList.push(newTimer);
  });

  const cellsToUpdate = [...a];

  cellsToUpdate.forEach((eachCellId) => hightlightTile(eachCellId));

  // if (iteration === 0) {
  //   hightlightTile(tileIndex);
  //   // console.log('columnsBefore', columnsBefore);
  //   // console.log('rowsBefore', rowsBefore);
  //   // console.log('columnsAfter', columnsAfter);
  //   // console.log('rowsAfter', rowsAfter);
  // } else if (iteration == 1) {
  //   /**
  //    * TL TM TR
  //    * ML MM MR
  //    * BL BM BR
  //    */
  //   // const TM = tileIndex - columns;
  //   // const TL = TM - 1;
  //   // const TR = TM + 1;
  //   // const BM = tileIndex + columns;
  //   // const BL = BM - 1;
  //   // const BR = BM + 1;
  //   // const ML = tileIndex - 1;
  //   // const MR = tileIndex + 1;
  //   // // Figure out cells
  //   // const cells = [TL, TM, TR, MR, ML, BL, BM, BR];
  //   // cells.forEach((eachTileIndex) => hightlightTile(eachTileIndex));
  // } else if (iteration < 6) {
  //   let a = new Set<number>();

  //   Array.from(Array(iteration)).map((tile, ind1) => {
  //     console.log('loop', iteration, ind1);
  //     if (ind1 === 0) return;
  //     const TM1 = tileIndex - columns * ind1;
  //     const BM1 = tileIndex + columns * ind1;
  //     const MR1 = tileIndex + ind1;
  //     const ML1 = tileIndex - ind1;

  //     [TM1, BM1, MR1, ML1].forEach((num) => a.add(num));

  //     Array.from(Array(ind1)).map((item, ind2) => {
  //       a.add(TM1 - ind2 - 1);
  //       a.add(TM1 + ind2 + 1);
  //       a.add(BM1 - ind2 - 1);
  //       a.add(BM1 + ind2 + 1);
  //       Array.from(Array(ind2)).map((item, ind3e) => {
  //         const ind3 = ind3e + 1;
  //         a.add(MR1 + columns * ind3);
  //         a.add(MR1 - columns * ind3);
  //         a.add(ML1 + columns * ind3);
  //         a.add(ML1 - columns * ind3);
  //       });
  //     });
  //   });

  //   const cellsToUpdate = [...a];

  //   console.log(cellsToUpdate);
  //   cellsToUpdate.forEach((eachCellId) => hightlightTile(eachCellId));
  // }
  // hightlightAroundTile(tileIndex, iteration + 1);
};

const handleOnClick = (index: number) => {
  timeoutList.forEach((timer) => clearTimeout(timer));
  timeoutList = [];
  createGrid();
  wrapper.style.backgroundColor = generateRandomHexColor();
  const oldSelectedDiv = document.getElementById(`${selectedId}`);
  if (oldSelectedDiv) oldSelectedDiv.classList.remove('selected');
  hightlightAroundTile(index);
  selectedId = index;
};

const createTile = (index: number) => {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.onclick = (e) => handleOnClick(index);
  tile.id = `${index}`;
  const inRow = Math.floor(index / columns);
  const inColumn = index % columns;
  tile.innerText = `[${inRow}, ${inColumn}] ${index}`;
  return tile;
};

const createTiles = (quantity: number) => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = '';

  columns = Math.floor(document.body.clientWidth / cellSize);
  rows = Math.floor(document.body.clientHeight / cellSize);

  wrapper.style.setProperty('--columns', columns.toString());
  wrapper.style.setProperty('--rows', rows.toString());

  createTiles(columns * rows);
};

createGrid();

window.onresize = () => createGrid();
