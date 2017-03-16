/**
 * Created by Ray on 2017/3/15.
 */
const fs = require("fs");
const path = require("path");
const webp = require('./webp');
const defaultDir = process.cwd();
const defaultCacheDir = path.join(process.cwd(), 'webpCache');
const mkdirp = require('mkdirp');
const isImage = require('./isImage');
const support = require('./support');
const WEBP_MIME_TYPE = 'image/webp';
const convert = (req, {root, cache}) => new Promise(function (resolve, reject) {
    if (!root) {
        root = defaultDir;
        console.log('use process.cwd() as rootDir,recommend to specify yourself')
    }
    if (!cache) {
        cache = defaultCacheDir;
        console.log('use default cacheDir,recommend to specify yourself')
    }
    const url = req.url;
    const type = isImage(url);
    const reqPath = path.join(root, url);
    const targetPath = path.join(cache, url + '.webp');
    if (type && support.check(req)) {
        if (fs.existsSync(targetPath)) {
            resolve({
                stream: fs.createReadStream(targetPath),
                type: WEBP_MIME_TYPE
            })
        } else if (fs.existsSync(reqPath)) {
            const targetDir = path.dirname(targetPath);
            new Promise(function (res, rej) {
                if (!fs.existsSync(targetDir)) {
                    mkdirp(targetDir, function (err) {
                        if (err) {
                            resolve({
                                stream: fs.createReadStream(reqPath),
                                type
                            })
                        } else {
                            res()
                        }
                    })
                } else {
                    res()
                }
            }).then(function () {
                webp(reqPath, targetPath).then(function () {
                    resolve({
                        stream: fs.createReadStream(targetPath),
                        type: WEBP_MIME_TYPE
                    })
                }).catch(function () {
                    resolve({
                        stream: fs.createReadStream(reqPath),
                        type
                    })
                });
            })
        } else {
            reject()
        }
    } else if (fs.existsSync(reqPath)) {
        resolve({
            stream: fs.createReadStream(reqPath),
            type
        })
    } else {
        reject()
    }

});
module.exports = convert;