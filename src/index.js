import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import treeBuilder from './treeBuilder.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, ('utf-8')), extractFormat(filepath));

const genDiff = (filepath1, filepath2) => {
  const FullPathFile1 = getFullPath(filepath1);
  const FullPathFile2 = getFullPath(filepath2);

  const dataFile1 = getData(FullPathFile1);
  const dataFile2 = getData(FullPathFile2);

  const tree = treeBuilder(dataFile1, dataFile2);

  const result = tree.map((node) => {
    if (node.type === 'added') {
      return `  + ${node.key}: ${node.value}`;
    }
    if (node.type === 'deleted') {
      return `  - ${node.key}: ${node.value}`;
    }
    if (node.type === 'changed') {
      return `  - ${node.key}: ${node.valueBefore}\n  + ${node.key}: ${node.valueAfter}`;
    }
    return `    ${node.key}: ${node.value}`;
  }).join('\n');

  return ['{', result, '}'].join('\n');
};

export default genDiff;
