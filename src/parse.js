import yaml from 'js-yaml';

const parser = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (data, format) => parser[format](data);
