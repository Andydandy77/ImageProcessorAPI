const paramHelper = require('./param_helper');
const functions = require('./functions');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

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
    const newFileName = params.name + '_' + params.width + '_degrees_' + 'direction' + params.direction + '.' + params.format;

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



module.exports = {
    resizeImage,
    rotateImage,
    flipImage
}