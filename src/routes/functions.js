const sharp = require('sharp');

async function resize(imgBuffer, params, format) {
    let width, height;
    if (!isNaN(params.percent)) {
        const image = await sharp(filePath);
        const metadata = await image.metadata();
        width = Math.round(metadata.width * params.percent * .01);
        height = Math.round(metadata.height * params.percent * .01);
    } else {
        width = params.width;
        height = params.height
    }
        let buffTemp;
        try {
            await sharp(imgBuffer)
            .resize(width, height)
            .toFormat(format)
            .toBuffer({resolveWithObject: true})
            .then((res) => {
                buffTemp = res.data;
            }).catch(e => {
                console.log(e);
            });

            return Promise.resolve(buffTemp);

        }

        catch (e) {
            return  Promise.reject(e);
        }
       
    
}

async function flip(imgBuffer, params, format) {
    let buffTemp;
    if (params.direction == "vert") {
        try {

            await sharp(imgBuffer)
            .flip()
            .toFormat(format)
            .toBuffer({resolveWithObject: true})
            .then((res) => {
                buffTemp = res.data;
            }).catch(e => {
                console.log(e);
            });

              return Promise.resolve(buffTemp);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }

    try {

        await sharp(imgBuffer)
        .flop()
        .toFormat(format)
        .toBuffer({resolveWithObject: true})
        .then(( res) => {
            buffTemp = res.data;
        }).catch(e => {
            console.log(e);
        });

        return Promise.resolve(buffTemp);
    }
    catch (e) {
        return Promise.reject(e);
    }

}

async function rotate(imgBuffer, params, format) {
    let angle = params.direction == "ccw" ? params.angle * -1 : params.angle;
    let buffTemp;
    try {

        await sharp(imgBuffer)
        .rotate(angle)
        .toFormat(format)
        .toBuffer({resolveWithObject: true})
        .then((res) => {
            buffTemp = res.data;
        }).catch(e => {
            console.log(e);
        });

        return Promise.resolve(buffTemp);
    }
    catch (e) {
        return Promise.reject(e);
    }

}

async function saturate(imgBuffer, params, format) {
    let buffTemp;
    try {

        await sharp(imgBuffer)
        .modulate({saturation : params.saturation})
        .toFormat(format)
        .toBuffer({resolveWithObject: true})
        .then((res) => {
            buffTemp = res.data;
        }).catch(e => {
            console.log(e);
        });

        return Promise.resolve(buffTemp);

    }
    catch (e) {
        return Promise.reject(e);
    }
    
}

async function grayscale(imgBuffer, params, format) {
    let buffTemp;
    if (!isNaN(params.amount)) {
        try {

            await sharp(imgBuffer)
            .modulate({saturation : params.amount})
            .grayscale()
            .toFormat(format)
            .toBuffer({resolveWithObject: true})
            .then((res) => {
                buffTemp = res.data;
            }).catch(e => {
                console.log(e);
            });
    
            return Promise.resolve(buffTemp);
    
    
        }
        catch (e) {
            return Promise.reject(e);
        }        
    } else {
        try {

            await sharp(imgBuffer)
            .grayscale()
            .toFormat(format)
            .toBuffer({resolveWithObject: true})
            .then((res) => {
                buffTemp = res.data;
            }).catch(e => {
                console.log(e);
            });
    
    
            return Promise.resolve(buffTemp);
        }
        catch (e) {
            return Promise.reject(e);
        }              
    }
    

    
}




module.exports = {
    resize,
    rotate,
    flip,
    saturate,
    grayscale
}