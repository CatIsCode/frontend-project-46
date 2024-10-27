import path from "path";
import fs from "fs";
import parse from './parse.js'

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, ('utf-8')), extractFormat(filepath));

const genDiff = (filepath1, filepath2) => {

  const FullPathFile1 = getFullPath(filepath1);
  const FullPathFile2 = getFullPath(filepath2);

  const dataFile1 = getData(FullPathFile1);
  const dataFile2 = getData(FullPathFile2);

  console.log('data1--', dataFile1);
  console.log('data2--', dataFile2);

}

export default genDiff;