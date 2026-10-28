/**
 * Number of Islands — see README.md next to this file.
 */

/**
 * TODO: describe the approach and its complexity.
 *
 * `grid` is not `readonly`: say here whether the solution overwrites it.
 */
const getKey = (m: number, n: number): string => `${m},${n}`;

type ElementKey = string;
export function numIslands(grid: string[][]): number {
  const rows = grid.length;
  if (!rows) return 0;

  const cols = grid[0].length;
  const adj = new Set<string>();
  let islands = 0;

  /**
   * 111001
   * 110011
   * 011110
   * 000011
   * 001110
   */

  /**
   * 111
   * 001
   * 111
   * 100
   * 111
   */
  const seen: Record<string, boolean> = {};

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const element = grid[row][col];
      const elementKey = getKey(row, col);
      let queue: number[][] = [];

      if (seen[elementKey] || element == '0') continue;
      queue.push([row, col]);

      let head = 0;
      islands++;

      while (head < queue.length) {
        const [localRow, localCol] = queue[head];
        const localKey = getKey(localRow, localCol);

        if (seen[localKey]) {
          head++;
          continue;
        }
        seen[localKey] = true;

        if (localRow < rows - 1 && grid[localRow + 1][localCol] == '1')
          queue.push([localRow + 1, localCol]);

        if (localCol < cols - 1 && grid[localRow][localCol + 1] == '1')
          queue.push([localRow, localCol + 1]);

        if (localRow > 0 && grid[localRow - 1][localCol] == '1')
          queue.push([localRow - 1, localCol]);

        if (localCol > 0 && grid[localRow][localCol - 1] == '1')
          queue.push([localRow, localCol - 1]);

        head++;
      }
    }
  }

  return islands;
}

// export function numIslands(grid: string[][]): number {
//   const rows = grid.length;
//   if (rows === 0) return 0;
//   const cols = grid[0].length;

//   const seen = new Uint8Array(rows * cols);
//   const DIRS = [
//     [1, 0],
//     [-1, 0],
//     [0, 1],
//     [0, -1],
//   ];
//   const q: number[] = [];
//   let islands = 0;

//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       const id = r * cols + c;
//       if (grid[r][c] !== '1' || seen[id]) continue;

//       islands++; // new island found → flood it
//       seen[id] = 1;
//       q.length = 0;
//       q.push(id);
//       let head = 0;

//       while (head < q.length) {
//         const cur = q[head++];
//         const cr = (cur / cols) | 0, cc = cur % cols;

//         for (const [dr, dc] of DIRS) {
//           const nr = cr + dr, nc = cc + dc;
//           if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

//           const nid = nr * cols + nc;

//           if (grid[nr][nc] !== '1' || seen[nid]) continue;
//           seen[nid] = 1; // mark on enqueue
//           q.push(nid);
//         }
//       }
//     }
//   }
//   return islands;
// }
