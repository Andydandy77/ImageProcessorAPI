const paramHelper = require('./param_helper');
const functions = require('./functions');
const sharp = require('sharp');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);


async function api(req, res, next) {
  
    let funcs = req.body;
    let url = req.query.url;
    let format = req.query.f
    let name = url.slice(0, -1 * format.length - 1);
    const newUrl = name + '_new1' + '.' + format;
    let file;
    let params;
    let imgBuffer = await sharp(url)
                            .toFormat(format)
                            .toBuffer();

    try {
        for (const func of funcs) {
            switch (func.name) {
                case 'resize':
                    params = paramHelper.getParamsResize(func);

                    imgBuffer = await functions.resize(imgBuffer, params, format);
                    break;
                case 'flip':
                    params = paramHelper.getParamsFlip(func);
                    imgBuffer = await functions.flip(imgBuffer, params, format);
                    break;
                case 'rotate':
                    params = paramHelper.getParamsRotate(func);
                    imgBuffer = await functions.rotate(imgBuffer, params, format);
                    break;
                case 'saturate':
                    params = paramHelper.getParamsSaturate(func);
                    imgBuffer = await functions.saturate(imgBuffer, params, format);
                    break;
                case 'grayscale':
                    params = paramHelper.getParamsGrayscale(func);
                    imgBuffer = await functions.grayscale(imgBuffer, params, format);
                    break;
                case 'thumbnail':
                    imgBuffer = await functions.resize(imgBuffer, {width:1280, height:720}, format);
                    break;
            }
        }
        await sharp(imgBuffer)
                .toFormat(format)
                .toFile(newUrl);
        const file = await readFile(newUrl);
        res.write(file);
        res.end()
    } catch(e) {
        next(e)
    }  
}      
    





    // // let file;
    // // functions.forEach(func => {
    // //     switch (func.name) {
    // //         case "resize":
    //             try {
    //                 await functions.resize(url, url_new, params);
    //                 const file = await readFile(url_new);
    //                 res.write(file);
    //                 res.end();
    //             }
    //             catch (e) {
    //                 next(e)
    //             }
    //     //         break;
    //     //     case "flip":
    //     //         break
    //     // }

    // // })






async function resizeImage(req, res, next) {
    const params = paramHelper.getParamsResize(req);
    const oldFileName = params.url;
    const newFileName = params.name + '_resized_w' + params.width + '_h' + params.height + '.' + params.format;

    try {
        
        await functions.resize(oldFileName, newFileName, params);
        const file = await readFile(newFileName);
        res.write(file);
        res.end()
    }
    catch (e) {
        next(e)
    }
}

async function rotateImage(req, res, next) {
    const params = paramHelper.getParamsRotate(req);
    const oldFileName = params.url;
    const newFileName = params.name + '_' + params.angle + '_degrees_' + 'direction' + params.direction + '.' + params.format;

    try {
        
        await functions.rotate(oldFileName, newFileName, params);
        const file = await readFile(newFileName);
        res.write(file);
        res.end()
    }
    catch (e) {
        next(e)
    }
}

async function flipImage(req, res, next) {
    const params = paramHelper.getParamsFlip(req);
    const oldFileName = params.url;
    const newFileName = params.name + '_flip_' + params.direction + '.' + params.format;

    try {
        
        await functions.flip(oldFileName, newFileName, params);
        const file = await readFile(newFileName);
        res.write(file);
        res.end()
    }
    catch (e) {
        next(e)
    }
}

async function saturateImage(req, res, next) {
    const params = paramHelper.getParamsSaturate(req);
    const oldFileName = params.url;
    const newFileName = params.name + '_saturate_' + params.saturation + '.' + params.format;

    try {
        
        await functions.saturate(oldFileName, newFileName, params);
        const file = await readFile(newFileName);
        res.write(file);
        res.end()
    }
    catch (e) {
        next(e)
    }
}

async function grayscaleImage(req, res, next) {
    const params = paramHelper.getParamsGrayscale(req);
    const oldFileName = params.url;
    const newFileName = params.name + '_grayscale.' + params.format;

    try {
        
        await functions.grayscale(oldFileName, newFileName, params);
        const file = await readFile(newFileName);
        res.write(file);
        res.end()
    }
    catch (e) {
        next(e)
    }
}



module.exports = {
    resizeImage,
    rotateImage,
    flipImage,
    saturateImage,
    grayscaleImage,
    api

}