import genDiff from '../src/index.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonTestFile = readFile('resultJSON.txt');



test('testing JSON', () => {
  console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file1.json'));
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file1.json')).toEqual(jsonTestFile);
});