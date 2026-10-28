# Number of Islands

Source: [LeetCode 200](https://leetcode.com/problems/number-of-islands/) · Difficulty: medium · Tags: matrix

## Problem

Given an `m × n` grid whose cells are the strings `"1"` (land) and `"0"` (water), return
the number of islands. An island is a maximal group of land cells connected horizontally
or vertically — diagonal contact does not connect. Everything outside the grid is water.

Signature: `numIslands(grid: string[][]): number`.

Target: `O(R·C)` time, written iteratively — at 300×300 a recursive flood fill can be
90 000 frames deep. State whether the solution overwrites `grid`.

Examples (each string is a row):

- `["11110", "11010", "11000", "00000"]` → `1`
- `["11000", "11000", "00100", "00011"]` → `3`
- `["11001", "10011", "00100", "01011"]` → `5` (corner contact does not connect)

Constraints:

- `1 ≤ m, n ≤ 300`
- every cell is `"1"` or `"0"`

## Approaches

| Approach | Time | Space | Note |
| -------- | ---- | ----- | ---- |
| TODO     | TODO | TODO  |      |

## Key idea

TODO — the one sentence you would need to hear to solve this again in six months.

## Traps

- Cells are strings: `"1"`, not the number `1`.
- Diagonal neighbours are not connected (`["101", "010", "101"]` → `5`).
- Land on the border is still an island — the outside counts as water.
- The grid may be a single row or a single column.
- At 300×300 a single island can contain all 90 000 cells.

## Follow-ups

- TODO
