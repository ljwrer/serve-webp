/**
 * Created by Ray on 2017/3/16.
 */
const webp = require('webp-converter');
const path = require('path');
module.exports = (dir, target) => new Promise(function (resolve, reject) {
    let method = 'cwebp';
    if (path.extname(dir) === '.gif') {
        method = 'gwebp';
    }
    webp[method](dir, target, "-q 80", function (status) {
        if (status.slice(0, 3) === '100') {
            resolve()
        } else {
            reject()
        }
    });
});