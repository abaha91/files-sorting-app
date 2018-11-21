const sortingApp = function() {
  const fs = require('fs');
  const path = require('path');

  let source = path.join(__dirname, 'source-folder');
  let newFolder = path.join(__dirname, 'new-folder');

  const createNewFolder = function(newFolder, source) {
    const isDirectoryExist = fs.existsSync(newFolder);

    if (!isDirectoryExist) {
      fs.mkdirSync(path.join(newFolder));
    }

    readDirectory(source);
    console.log('Files successfully sorted');

  };

  const readDirectory = function(source) {

    const sourceDirectory = fs.readdirSync(source);

      sourceDirectory.forEach((file) => {

        let localSource = path.join(source);
        let pathToFile = path.join(localSource, file);
        let pathToNewFile = path.join(newFolder, file[0], file);
        let firstLetterOfFileName = file[0];

        const fileStat = fs.statSync(pathToFile);

        if(fileStat.isFile()) {

          const isDirectoryExist = fs.existsSync(path.join(newFolder, firstLetterOfFileName));
          if (!isDirectoryExist) {
            fs.mkdirSync(path.join(newFolder, firstLetterOfFileName));
          }

          const isFileExist = fs.existsSync(path.join(pathToNewFile));
          if (!isFileExist) {
            fs.linkSync(pathToFile, pathToNewFile);
          }


        } else if (fileStat.isDirectory()) {
          readDirectory(pathToFile);
        }
      });
  };

  createNewFolder(newFolder, source);
}

module.exports = sortingApp;





