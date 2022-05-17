const sharp = require('sharp');

async function resize(filePath, newFilePath, params) {
    try {        

        await sharp(filePath)
        .resize(params.width, params.height)
        .toFormat(params.format)
        .toFile(newFilePath);


        return Promise.resolve(newFilePath);
    }
    catch (e) {
        return Promise.reject(e);
    }

    
}

async function rotate(filePath, newFilePath, params) {
    let angle = params.direction == "ccw" ? params.angle * -1 : params.angle;
    try {

        await sharp(filePath)
        .rotate(angle)
        .toFormat(params.format)
        .toFile(newFilePath);


        return Promise.resolve(newFilePath);
    }
    catch (e) {
        return Promise.reject(e);
    }

}

async function flip(filePath, newFilePath, params) {
    if (params.direction == "vert") {
        try {

            await sharp(filePath)
            .flip()
            .toFormat(params.format)
            .toFile(newFilePath);
    
    
            return Promise.resolve(newFilePath);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }

    try {

        await sharp(filePath)
        .flop()
        .toFormat(params.format)
        .toFile(newFilePath);

        return Promise.resolve(newFilePath);
    }
    catch (e) {
        return Promise.reject(e);
    }

}




module.exports = {
    resize,
    rotate,
    flip
}