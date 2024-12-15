import _ from 'lodash';

const treeBuilder = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const result = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', value: treeBuilder(obj1[key], obj2[key]) };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
  return result;
};

export default treeBuilder;
