import fs from 'fs';
import path from 'path';
function ls (location, regex) {
  var listIn = fs.readdirSync (location);
  var listOut = [];

  listIn.forEach (function (item) {
    if (regex && !regex.test (item)) {
      return;
    }

    listOut.push (item);
  });

  return listOut;
}

const themeFiles = ls (path.join (__dirname, '../themes/'));
let themes = [];

themeFiles.forEach ( (themeFile) => {
  themes.push (require(path.join (__dirname, '../themes/', themeFile)));
});
console.log ('==> App loaded ', themes.length ,' theme(s)');
export default themes;
