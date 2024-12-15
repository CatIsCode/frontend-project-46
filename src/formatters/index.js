import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  plain,
  stylish,
};

const formatter = (ast, format) => formatters[format](ast);

export default formatter;
