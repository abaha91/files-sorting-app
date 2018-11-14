const fs = require('fs');
const path = require('path');
const source = './source-folder';

const files = fs.readdir(source, (error, files) => {
    if (error) {
        console.log('Error');
        return;
    }

    fs.mkdir(path.join(__dirname, 'new-folder'), (error) => {
        if (error) {
            console.log('Folder can not be created');
            return;
        }
    });


});

