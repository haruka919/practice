'use strict'
{
    // BINGOの「B」行の配列を作成
  function createColumn(col) {
    const source = [];
    for (let i = 0; i < 15; i++) {
      // 1...15
      // source[i] = i + 1 + 15*0;
      // 16...30
      // source[i] = i + 1 + 15*1;
      // 31...45
      // source[i] = i + 1 + 15*2;
      source[i] = i + 1 + 15 * col;
    }
    const column = [];
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }
    return column;
  }

  const columns = [];
  columns[0] = createColumn(0);
  columns[1] = createColumn(1);
  columns[2] = createColumn(2);
  columns[3] = createColumn(3);
  columns[4] = createColumn(4);
  columns[2][2] = 'FREE';

  console.table(columns);
}