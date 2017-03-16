/**
 * Created by Ray on 2017/3/15.
 */
const isImage = require('./isImage');
const support = require('./support');
const convert = require('./convert');
module.exports = ({root,cache}) => {
    return (req,res,next)=>{
        convert(req,{root,cache}).then(({stream,type})=>{
            res.setHeader('content-type', type);
            stream.pipe(res)
        }).catch(next);
    }
}