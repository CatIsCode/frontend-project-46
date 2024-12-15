import _ from 'lodash';

const getFormatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree, path = '') => {
  const lines = tree.filter((node) => node.type !== 'unchanged').map((node) => {
    switch (node.type) {
      case 'nested':
        return plain(node.value, `${path}${node.key}.`);
      case 'added':
        return `Property '${path}${node.key}' was added with value: ${getFormatValue(node.value)}`;
      case 'deleted':
        return `Property '${path}${node.key}' was removed`;
      case 'changed': {
        return `Property '${path}${node.key}' was updated. From ${getFormatValue(node.valBefore)} to ${getFormatValue(node.valAfter)}`;
      }
      default:
        throw new Error(`Unknown ${node.type}, please try again`);
    }
  });
  return lines.join('\n');
};

export default plain;
