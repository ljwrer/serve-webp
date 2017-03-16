/**
 * Created by Ray on 2017/3/15.
 */
const path = require('path');
const ImageSuffix = ['jpg','jpeg','gif','png'];
const type = suffix => suffix === 'jpg'? 'image/jpeg':`image/${suffix}`;
const getFileSuffix = name => path.extname(name).replace(/^\./, '').toLowerCase();
const isImage = pathName => {
    const suffix = getFileSuffix(pathName);
    if(ImageSuffix.indexOf(suffix) > -1){
        return type(suffix)
    }else {
        return false
    }
};
module.exports = isImage;
