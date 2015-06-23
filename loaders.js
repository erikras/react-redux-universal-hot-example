module.exports = [
  {include: /\.json$/, loaders: ["json-loader"]},
  {include: /\.png$/, loader: 'url', query: {mimetype: 'image/png', limit: 10240}},
  {include: /\.jpg$/, loader: 'url', query: {mimetype: 'image/jpg', limit: 10240}},
  {include: /\.gif$/, loader: 'url', query: {mimetype: 'image/gif', limit: 10240}},
  {include: /\.md$/, loader: "html!markdown"},
  {include: /\.svg$/, loader: 'url', query: {mimetype: 'image/svg+xml', limit: 10240}},
  {
    include: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url',
    query: {mimetype: 'application/font-woff', limit: 10240}
  },
  {
    include: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url',
    query: {mimetype: 'application/font-woff', limit: 10240}
  },
  {include: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
];
module.exports.css = 'css?importLoaders=1!autoprefixer!sass';
