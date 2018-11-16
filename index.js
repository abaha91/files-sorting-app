const fs = require('fs');
const path = require('path');

let source = path.join(__dirname, 'source-folder');
let newFolder = path.join(__dirname, 'new-folder');



const readDirectory = function(source) {

  fs.readdir(source, (error, files) => {

    if (error) {
        console.log('Error');
        return;
    }

    files.forEach((file) => {

      let localSource = path.join(source);
      let pathToFile = path.join(localSource, file);
      let pathToNewFile = path.join(newFolder, file[0], file);
      let firstLetterOfFileName = file[0];

      fs.stat(pathToFile, (error, currentFile) => {
        if (currentFile.isFile() && !fs.existsSync(pathToNewFile)) {
          if (!fs.exists(path.join(newFolder, firstLetterOfFileName))) {
            console.log(path.join(newFolder, firstLetterOfFileName));
            fs.mkdir(path.join(newFolder, firstLetterOfFileName));
          }

          fs.link(pathToFile, pathToNewFile, (error) => {
            if (error) {
              console.log(error);
            }
          })

        } else if (currentFile.isDirectory()) {
          readDirectory(pathToFile);
        }
      })
    });
  });

};


const createNewFolder = function(newFolder) {
  if (!fs.exists(newFolder)) {
    fs.mkdir(path.join(newFolder), (error) => {
      if (error) {
        console.log('Folder can not be created');
        return;
      }
    });
  }
};

createNewFolder(newFolder);
readDirectory(source);



