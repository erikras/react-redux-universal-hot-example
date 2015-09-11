//  enable runtime transpilation to use ES6/7 in node
require('babel/register')({
  stage: 0,
  plugins: ['typecheck']
});
