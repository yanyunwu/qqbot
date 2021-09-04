
const fs = require('fs');

exports.readFile = function (url) {
    return new Promise(resolve => {
        fs.readFile(url, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let json = JSON.parse(data.toString());
            resolve(json);
        });
    });
}