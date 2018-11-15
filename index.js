const fs = require('fs');
const path = require('path');
const source = './source-folder';
const newFolder = './new-folder';


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

    function isFileCheck (files) {
      files.forEach((file) => {
        fs.stat(path.join(__dirname, source, file), (error, stat) => {
          if (stat.isFile()) {
            arr.push(stat);
          } else if (stat.isDirectory){
          //    code
          }
        })
      })
    }

    isFileCheck(files);


});

