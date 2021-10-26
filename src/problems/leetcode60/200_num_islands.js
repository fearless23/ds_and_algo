/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
  const mark = mark_island(grid);
  let islands = 0;

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const v = grid[i][j];
      if (v === '1') {
        islands += 1;
        const island = `_${islands}_`; // name of island
        grid[i][j] = island;
        mark(island, { i, j });
      }
    }
  }
  // console.log('islands -->', JSON.stringify(grid, null, 2));
  return islands;
};

class Frontiers {
  /**
   *
   * @param {{i:number,j:number}[]} nums
   */
  constructor (nums = []) {
    this.set = new Set(nums);
    this.xxx = nums;
  }

  add (item) {
    // add to back of array
    if (!this.set.has(item)) {
      this.set.add(item);
      this.xxx.push(item);
    }
  }

  take () {
    // take from front
    return this.xxx.shift();
  }

  size () {
    return this.xxx.length;
  }

  is_empty () {
    return this.size() === 0;
  }
}

// uses queue
const mark_island = (grid) => (island, pos) => {
  const q = new Frontiers([pos]);

  while (!q.is_empty()) {
    const { i, j } = q.take();

    if (grid[i][j + 1] === '1') {
      grid[i][j + 1] = island;
      q.add({ i, j: j + 1 });
    }

    if (grid[i][j - 1] === '1') {
      grid[i][j - 1] = island;
      q.add({ i, j: j - 1 });
    }

    const next_row = grid[i + 1];
    if (next_row !== undefined) {
      if (next_row[j] === '1') {
        grid[i + 1][j] = island;
        q.add({ i: i + 1, j });
      }
    }

    const prev_row = grid[i - 1];
    if (prev_row !== undefined) {
      if (prev_row[j] === '1') {
        grid[i - 1][j] = island;
        q.add({ i: i - 1, j });
      }
    }
  }
};

// do not use queue --> faster
const mark_island2 = (grid) => (island, pos) => {
  let frontiers = [pos];

  while (frontiers.length) {
    const q = new Set();
    frontiers.forEach(({ i, j }) => {
      if (grid[i][j + 1] === '1') {
        grid[i][j + 1] = island;
        // adding unique pos to new_frontiers
        q.add({ i, j: j + 1 });
      }

      if (grid[i][j - 1] === '1') {
        grid[i][j - 1] = island;
        q.add({ i, j: j - 1 });
      }

      const next_row = grid[i + 1];
      if (next_row !== undefined) {
        if (next_row[j] === '1') {
          grid[i + 1][j] = island;
          q.add({ i: i + 1, j });
        }
      }

      const prev_row = grid[i - 1];
      if (prev_row !== undefined) {
        if (prev_row[j] === '1') {
          grid[i - 1][j] = island;
          q.add({ i: i - 1, j });
        }
      }
    });
    frontiers = Array.from(q);
  }
};

// const grid = [['1', '1', '1'], ['0', '1', '0'], ['1', '1', '1']];
// const grid = [['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']];

const grid = [
  ['1', '1', '1', '1', '1', '0', '1', '1', '1', '1'],
  ['0', '1', '1', '0', '1', '1', '1', '0', '1', '1'],
  ['1', '0', '1', '0', '1', '1', '0', '1', '0', '1'],
  ['1', '0', '1', '1', '0', '1', '1', '1', '1', '1'],
  ['1', '1', '0', '0', '1', '1', '1', '1', '1', '1'],
  ['1', '1', '0', '1', '1', '1', '1', '1', '1', '1'],
  ['1', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
  ['0', '1', '1', '0', '1', '1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '1', '0', '1', '1', '1', '1'],
  ['0', '1', '1', '1', '1', '1', '0', '1', '1', '1']
];

/*
const grid = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1']
];
*/

// const grid = [['1', '1', '1'], ['0', '1', '0'], ['1', '1', '1']];
const result = numIslands(grid);
console.log('result --> ', result);
