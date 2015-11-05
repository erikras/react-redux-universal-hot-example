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

const styleFiles = ls (path.join (__dirname, '../styles/'));
let styles = [];

styleFiles.forEach ( (styleFile) => {
  let name = styleFile.replace ('.styles.js', '');
  name = name.replace ('./','');
  styles.push ({
    componentName: name,
    style: require (path.join (__dirname, '../styles/', styleFile))
  });
});
console.log ('==> App loaded ', styles.length ,' style(s)');
export default styles;
