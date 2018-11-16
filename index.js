const fs = require('fs');
const path = require('path');

let source = path.join(__dirname, 'source-folder');
let newFolder = path.join(__dirname, 'new-folder');


fs.readdir(source, (error, files) => {

  if (error) {
      console.log('Error');
      return;
  }

  createNewFolder();



  files.forEach((file) => {

    let source = path.join(__dirname, 'source-folder');
    let pathToFile = path.join(source, file);
    let pathToNewFile = path.join(newFolder, file[0], file);
    let firstLetterOfFileName = file[0];

    fs.stat(pathToFile, (error, currentFile) => {
      if (currentFile.isFile() && !fs.existsSync(pathToNewFile)) {


        if (!fs.existsSync(path.join(newFolder, firstLetterOfFileName))) {
          fs.mkdir(path.join(newFolder, firstLetterOfFileName));
        }

        fs.link(pathToFile, pathToNewFile, (error) => {
          if (error) {
            console.log(error);
          }
        })
      } else if (currentFile.isDirectory()) {
        source = path.join(source, file);
        // readDir()
      }
    })
  });

  function createNewFolder() {
    if (files && !fs.existsSync(newFolder)) {
      fs.mkdir(path.join(__dirname, 'new-folder'), (error) => {
        if (error) {
          console.log('Folder can not be created');
          return;
        }
      });
    }
  }

});

