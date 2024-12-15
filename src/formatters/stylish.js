import _ from 'lodash';

const stringify = (value, depth = 0) => {
  const iter = (node, depth) => {
    const indent = '  '.repeat(depth * 2);
    if (!_.isObject(node)) {
      return node;
    }
    const arr = Object.entries(node);
    const result = arr.map(([key, value]) => `    ${indent}${key}: ${stringify(value, depth + 1)}`);
    return ['{', ...result, `${indent}}`].join('\n');
  };
  return iter(value, depth);
};


const stylish = (tree) => {
  const iter = (tree, depth) => {
    const spacesCount = 2;
    const indent = '  '.repeat(depth * spacesCount - 2);
    const lines = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `  ${indent}  ${node.key}: ${iter(node.value, depth + 1)}`;
        case 'deleted':
          return `  ${indent}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'added':
          return `  ${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'unchanged':
          return `  ${indent}  ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return `  ${indent}- ${node.key}: ${stringify(node.valueBefore, depth)}\n  ${indent}+ ${node.key}: ${stringify(node.valueAfter, depth)}`;
        default:
          throw new Error(`Unknown status - ${node.type}`);
      }
    });
    return ['{', ...lines, `${indent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;