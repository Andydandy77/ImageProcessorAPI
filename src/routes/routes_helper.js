const paramHelper = require('./param_helper');
const functions = require('./functions');

async function api(req, res, next) {
  
    let funcs = JSON.parse(req.body.json);
    let format = req.query.f;
    let params;
    let imgBuffer = req.files.file.data;

    try {
        for (const func of funcs) {
            switch (func.name) {
                case 'Resize':
                    params = paramHelper.getParamsResize(func);

                    imgBuffer = await functions.resize(imgBuffer, params, format);
                    break;
                case 'Flip':
                    params = paramHelper.getParamsFlip(func);
                    imgBuffer = await functions.flip(imgBuffer, params, format);
                    break;
                case 'Rotate':
                    params = paramHelper.getParamsRotate(func);
                    imgBuffer = await functions.rotate(imgBuffer, params, format);
                    break;
                case 'Saturate':
                    params = paramHelper.getParamsSaturate(func);
                    imgBuffer = await functions.saturate(imgBuffer, params, format);
                    break;
                case 'Grayscale':
                    params = paramHelper.getParamsGrayscale(func);
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