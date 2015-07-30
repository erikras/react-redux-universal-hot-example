import path from 'path';

const pathToSrc = path.resolve(__dirname, '.');

export function relativeToSrc(value) {
  return value.slice(pathToSrc.length);
}

export function requireServerImage(imagePath) {
  if (!imagePath) {
    return '';
  }
  if (__CLIENT__) {
    throw new Error('image-resolver called on browser');
  } else {
    // Load images compiled from `webpack-stats`
    // don't cache the `webpack-stats.json` on dev
    // so we gonna read the file on each request
    // on production, use simple `require` to cache the file
    let images = require('../webpack-stats.json').images;
    if (__DEVELOPMENT__) {
      delete require.cache[require.resolve('../webpack-stats.json')];
    }
    if (!images) {
      return '';
    }

    // Find the correct image
    const regex = new RegExp(`${imagePath}$`);
    const image = images.find(img => regex.test(img.original));

    // Serve image.
    if (image) return image.compiled;

    // Serve a not-found asset maybe?
    return '';
  }
}
