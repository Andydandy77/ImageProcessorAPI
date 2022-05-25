const ParamsBuilder = require('./param_helper');
const functions = require('./functions');


async function api(req, res, next) {
  
    let funcs = JSON.parse(req.body.json);
    let format = ParamsBuilder.getFormat(req.query.f);
    let imgBuffer = req.files.file.data;

    try {
        for (const func of funcs) {
            let params = ParamsBuilder.getParams(func);
            switch (func.name) {
                case 'Resize':
                    imgBuffer = await functions.resize(imgBuffer, params, format);
                    break;
                case 'Flip':
                    imgBuffer = await functions.flip(imgBuffer, params, format);
                    break;
                case 'Rotate':
                    imgBuffer = await functions.rotate(imgBuffer, params, format);
                    break;
                case 'Saturate':
                    imgBuffer = await functions.saturate(imgBuffer, params, format);
                    break;
                case 'Grayscale':
                    imgBuffer = await functions.grayscale(imgBuffer, params, format);
                    break;
                case 'Thumbnail':
                    imgBuffer = await functions.resize(imgBuffer, {width:200, height:200}, format);
                    break;
            }
        }
        res.write(imgBuffer);
        res.end()
    } catch(e) {
        next(e)
    }  
} 


    
module.exports = {
    api
}