const fs = require('fs');
const path = require('path');

let source = path.join(__dirname, 'source-folder');
let newFolder = path.join(__dirname, 'new-folder');

const createNewFolder = function(newFolder, source) {
  !fs.exists(newFolder, () => {
    fs.mkdir(path.join(newFolder), (error) => {
      if (error) {
        console.log('Folder can not be created');
        return;
      }
      readDirectory(source);
    });
  })
};

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
        if (currentFile.isFile()) {

          !fs.exists(path.join(newFolder, firstLetterOfFileName), () => {
            fs.mkdir(path.join(newFolder, firstLetterOfFileName), () => {
              fs.link(pathToFile, pathToNewFile, (error) => {
                if (error) {
                  console.log(error);
                  return;
                };

                fs.unlink(pathToFile, () => {
                  console.log('File ' + file + ' removed');
                })
              })
            });
          });
        } else if (currentFile.isDirectory()) {
          if (!files.length) {
            fs.rmdir(currentFile, () => {
              console.log('Folder ' + file + ' removed');
            })
          } else {
            readDirectory(pathToFile);
          }
        }
      })
    });
  });
};

createNewFolder(newFolder, source);



