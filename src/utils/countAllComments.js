export const countAllComments = (nodes) => {
  return nodes.reduce(
    (sum, node) =>
      // 1 for the current node
      // + however many comments are in its children array
      sum + 1 + countAllComments(node.children || []),
    0
  );
};
