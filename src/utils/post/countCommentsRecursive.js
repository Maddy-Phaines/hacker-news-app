export const countAllComments = (nodes) => {
  if (!nodes || !Array.isArray(nodes)) return 0;
  return nodes.reduce(
    (sum, node) =>
      // 1 for the current node
      // + however many comments are in its children array
      sum + 1 + countAllComments(node.children || []),
    0,
  );
};
