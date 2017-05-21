module.exports = ({ file, options }) => ({
  plugins: [
    require('postcss-import')({ root: file.dirname }),
    require('cssnext')(options.cssnext ? options.cssnext : false)
  ]
});