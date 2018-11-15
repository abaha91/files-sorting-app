const fs = require('fs');
const path = require('path');

let source = './source-folder';
let newFolder = './new-folder';
let pathToReadedFolder;


fs.readdir(source, (error, files) => {

    if (error) {
        console.log('Error');
        return;
    }

    // if (files) {
    //   fs.mkdir(path.join(__dirname, 'new-folder'), (error) => {
    //     if (error) {
    //       console.log('Folder can not be created');
    //       return;
    //     }
    //   });
    // }

    const arr = [];

    files.forEach((file) => {
      source = './source-folder';
      pathToReadedFolder = path.join(__dirname, source);

      fs.stat(pathToReadedFolder, (error, currentFile) => {

        if (currentFile.isFile()) {
          pushToArr(currentFile);
        } else if (currentFile.isDirectory()){
          source = path.join(source, file);
          pathToReadedFolder = path.join(__dirname, source);
          readDir(file, pathToReadedFolder);
        } else {
          return;
        }

      })
    })

    function pushToArr(file) {
      arr.push(file);
    }

    function readDir(file, pathToReadedFolder) {
      readDirectory(file, pathToReadedFolder)
    }

    function readDirectory(file, pathToReadedFolder) {
      console.log(pathToReadedFolder);
      fs.readdir(pathToReadedFolder, (error, files) => {
        files.forEach((file) => {
          console.log('test');
          fs.stat(path.join(pathToReadedFolder, file), (error, file) => {
            if (file.isFile()) {
              pushToArr(file);
            } else if (file.isDirectory()){
              readDir(file);
            } else {
              return;
            }
          })
        })
      })
    }


    setTimeout(() => {
      console.log(arr);
    }, 10000);

});

