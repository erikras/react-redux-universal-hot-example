import path from 'path';

const pathToSrc = path.resolve(__dirname, '.');

export function relativeToSrc(value) {
  return value.slice(pathToSrc.length);
}
