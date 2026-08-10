/**
 * Binary tree node plus LeetCode-style level-order (BFS) serialization,
 * so a test can write `arrayToTree([3, 9, 20, null, null, 15, 7])`.
 */
export class TreeNode<T = number> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null,
  ) {}
}

/** [3, 9, 20, null, null, 15, 7] -> tree. `null` marks a missing child. */
export function arrayToTree<T>(values: readonly (T | null)[]): TreeNode<T> | null {
  if (values.length === 0 || values[0] === null || values[0] === undefined) return null;

  const root = new TreeNode(values[0] as T);
  const queue: TreeNode<T>[] = [root];
  let i = 1;

  while (queue.length > 0 && i < values.length) {
    const node = queue.shift() as TreeNode<T>;

    const leftValue = values[i++];
    if (leftValue !== null && leftValue !== undefined) {
      node.left = new TreeNode(leftValue);
      queue.push(node.left);
    }

    const rightValue = values[i++];
    if (rightValue !== null && rightValue !== undefined) {
      node.right = new TreeNode(rightValue);
      queue.push(node.right);
    }
  }

  return root;
}

/** Inverse of `arrayToTree`: level order with trailing nulls trimmed. */
export function treeToArray<T>(root: TreeNode<T> | null): (T | null)[] {
  if (root === null) return [];

  const result: (T | null)[] = [];
  const queue: (TreeNode<T> | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift() ?? null;
    if (node === null) {
      result.push(null);
      continue;
    }
    result.push(node.val);
    queue.push(node.left, node.right);
  }

  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}
