/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const rob = function (root) {
  const dfs = (node) => {
    let leftMax = [0, 0];
    let rightMax = [0, 0];
    if (node.left) leftMax = dfs(node.left);
    if (node.right) rightMax = dfs(node.right);

    const maxIfTakeCurr = node.val + leftMax[1] + rightMax[1];
    const maxIfSkipCurr = leftMax[0] + rightMax[0];
    return [Math.max(maxIfTakeCurr, maxIfSkipCurr), maxIfSkipCurr];
  };
  return dfs(root)[0];
};

// my solution, this is simple, but leetcode max time limit exceeded ??
const rob2 = function (root) {
  if (!root) return 0; // special case

  const left = root.left;
  const right = root.right;
  // do not use root
  const sum_1 = rob(left) + rob(right);

  // use root
  let sum_2 = root.val;
  if (left) sum_2 += (rob(left.left) + rob(left.right));
  if (right) sum_2 += (rob(right.left) + rob(right.right));

  return Math.max(sum_1, sum_2);
};
