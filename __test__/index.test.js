import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing JSON', () => {
  const expectedValue = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  const actualValue = readFile('resultJSON.txt');
  expect(expectedValue).toEqual(actualValue);
});

test('testing yml', () => {
  const expectedValue = genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml');
  const actualValue = readFile('resultYML.txt');
  expect(expectedValue).toEqual(actualValue);
});
