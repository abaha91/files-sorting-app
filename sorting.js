const sortingApp = function() {
  const fs = require('fs');
  const path = require('path');
  const yargs = require('yargs');

  let source = yargs.argv.source;
  let newFolder = yargs.argv.target;

  const createNewFolder = async function(newFolder) {
    const isDirectoryExist = await fs.existsSync(newFolder);

    if (!isDirectoryExist) {
      await fs.mkdirSync(path.join(newFolder));
    }

    console.log('Files successfully sorted');

  };

  const readDirectory = async function(source) {

    const sourceDirectory = fs.readdirSync(source);

    sourceDirectory.forEach( (file) => {

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

  createNewFolder(newFolder)
    .then(() => readDirectory(source));
}

module.exports = sortingApp;





