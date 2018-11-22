const yargs = require('yargs');

const sortingApp = function() {
  const fs = require('fs');
  const path = require('path');

  let source = yargs.argv.source;
  let newFolder = yargs.argv.target;

  const createNewFolder = function(newFolder, source) {
    !fs.exists(newFolder, () => {
      fs.mkdir(path.join(newFolder), (error) => {
        if (error) {
          console.log('Folder can not be created');
          return;
        }
        readDirectory(source);
      });
      console.log('Files successfully sorted');
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
                })
              });
            });
          } else if (currentFile.isDirectory()) {
            readDirectory(pathToFile);
          }
        })
      });
    });
  };

  createNewFolder(newFolder, source);
}

module.exports = sortingApp;





