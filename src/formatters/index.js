import plain from './plain.js';
import stylish from './stylish.js';
import json from './JSON.js';

const formatters = {
  plain,
  stylish,
  json,
};

const formatter = (ast, format) => formatters[format](ast);

export default formatter;
