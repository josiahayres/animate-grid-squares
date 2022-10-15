import { determineGridSize } from './createGrid';
import { generateArrayWithNumbers } from './utilities';

const debug = true;

const hightlightTile = (tileIndex: number) => {
  const divToHighlight = document.getElementById(`${tileIndex}`);
  if (divToHighlight) divToHighlight.classList.add('selected');
};

export const hightlightAroundTile = (
  tileIndex: number,
  cellSize: number,
  timeoutList: any[]
) => {
  const { rows, columns, cellCount } = determineGridSize(cellSize);

  const getColumnsBefore = (cellIndex: number): number => {
    return cellIndex > columns ? cellIndex % columns : cellIndex;
  };
  // const getColumnsAfter = (cellIndex: number): number => {
  //   return columns - 1 - getColumnsBefore(cellIndex);
  // };

  const getRow = (cellIndex: number) => {
    return Math.floor(cellIndex / columns);
  };
  const getColumn = (cellIndex: number) => {
    return cellIndex % columns;
  };

  debug && console.log('hightlightAroundTile', tileIndex);
  const columnsBefore = getColumnsBefore(tileIndex);
  const columnsAfter = columns - 1 - columnsBefore;
  const rowsBefore = tileIndex >= columns ? Math.floor(tileIndex / columns) : 0;
  const rowsAfter = rows - 1 - rowsBefore;

  const max = Math.max(columnsBefore, columnsAfter, rowsBefore, rowsAfter);
  debug && console.log('max', max);

  let a = new Set<number>();

  generateArrayWithNumbers(max + 1).map((iteration) => {
    debug && console.log('iteration', iteration);
    const newTimer = setTimeout(() => {
      const fromCenterTo3 = tileIndex + iteration;
      const fromCenterTo6 = tileIndex + columns * iteration;
      const fromCenterTo9 = tileIndex - iteration;
      const fromCenterTo12 = tileIndex - columns * iteration;

      debug && console.log('fromCenterTo3', fromCenterTo3);
      if (getRow(tileIndex) === getRow(fromCenterTo3)) a.add(fromCenterTo3);
      debug && console.log('fromCenterTo6', fromCenterTo6);
      if (fromCenterTo6 <= cellCount) a.add(fromCenterTo6);
      debug && console.log('fromCenterTo9', fromCenterTo9);
      if (getRow(tileIndex) === getRow(fromCenterTo9)) a.add(fromCenterTo9);
      debug && console.log('fromCenterTo12', fromCenterTo12);
      if (fromCenterTo12 >= 0) a.add(fromCenterTo12);

      generateArrayWithNumbers(iteration).map((ind2) => {
        const from1030to12 = fromCenterTo12 - ind2 - 1;
        if (
          from1030to12 >= 0 &&
          getColumn(tileIndex) >= getColumn(from1030to12)
        ) {
          debug &&
            console.log(
              'from1030to12',
              from1030to12,
              getColumn(tileIndex),
              getColumn(from1030to12),
              getRow(tileIndex),
              getRow(from1030to12)
            );
          a.add(from1030to12);
        }

        const from6to730 = fromCenterTo6 - ind2 - 1;
        if (getColumn(from6to730) <= getColumn(tileIndex)) {
          debug &&
            console.log(
              'from6to730',
              from6to730,
              getColumn(tileIndex),
              getColumn(from6to730),
              getRow(tileIndex),
              getRow(from6to730)
            );
          a.add(from6to730);
        }

        const from430to6 = fromCenterTo6 + ind2 + 1;
        if (
          getRow(from430to6) <= rows &&
          getColumn(tileIndex) <= getColumn(from430to6)
        ) {
          debug &&
            console.log(
              'from430to6',
              from430to6,
              getColumn(tileIndex),
              getColumn(from430to6),
              getRow(tileIndex),
              getRow(from430to6)
            );
          a.add(from430to6);
        }
        const from12to130 = fromCenterTo12 + ind2 + 1;
        if (
          from12to130 >= 0 &&
          getColumn(from12to130) >= getColumn(tileIndex)
        ) {
          debug &&
            console.log(
              'from12to130',
              from12to130,
              getColumn(tileIndex),
              getColumn(from12to130),
              getRow(tileIndex),
              getRow(from12to130)
            );
          a.add(from12to130);
        }

        generateArrayWithNumbers(ind2).map((ind3e) => {
          const ind3 = ind3e + 1;
          const from9to1030 = fromCenterTo9 - columns * ind3;
          if (
            from9to1030 >= 0 &&
            getColumn(from9to1030) < getColumn(tileIndex)
          ) {
            debug &&
              console.log(
                'from9to1030',
                from9to1030,
                getColumn(tileIndex),
                getColumn(from9to1030),
                getRow(tileIndex),
                getRow(from9to1030)
              );
            a.add(from9to1030);
          }

          const from730to9 = fromCenterTo9 + columns * ind3;
          if (from730to9 >= 0 && getColumn(from730to9) < getColumn(tileIndex)) {
            debug &&
              console.log(
                'from730to9',
                from730to9,
                getColumn(tileIndex),
                getColumn(from730to9),
                getRow(tileIndex),
                getRow(from730to9)
              );
            a.add(from730to9);
          }

          const from3to430 = fromCenterTo3 + columns * ind3;
          if (
            from3to430 >= 0 &&
            getColumn(from3to430) >= getColumn(tileIndex)
          ) {
            debug &&
              console.log(
                'from3to430',
                from3to430,
                getColumn(tileIndex),
                getColumn(from3to430),
                getRow(tileIndex),
                getRow(from3to430)
              );
            a.add(from3to430);
          }

          const from130to3 = fromCenterTo3 - columns * ind3;
          if (
            from130to3 >= 0 &&
            getColumn(from130to3) >= getColumn(tileIndex)
          ) {
            debug &&
              console.log(
                'from130to3',
                from130to3,
                getColumn(tileIndex),
                getColumn(from130to3),
                getRow(tileIndex),
                getRow(from130to3)
              );
            a.add(from130to3);
          }
        });
      });

      const cellsToUpdate = [...a];
      cellsToUpdate.forEach((eachCellId) => hightlightTile(eachCellId));
    }, 50 * iteration);
    timeoutList.push(newTimer);
  });

  const cellsToUpdate = [...a];

  cellsToUpdate.forEach((eachCellId) => hightlightTile(eachCellId));
};
