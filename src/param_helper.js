const config = require('../config.json');

let getParamsResize = (req) => {
    let url = "../img/" + req.query.url;
    let width = req.query.w;
    let height = req.query.h;
    
    try {
        width = parseFloat(width);
    }
    catch {
        width = config.DefaultWidth;
    }

    try {
        height = parseFloat(height);
    }
    catch {
        height = config.DefaultHeight;
    }

    if(width === undefined || isNaN(width)){
        width = config.DefaultWidth;
    }

    if(height === undefined || isNaN(height)){
        height = config.DefaultHeight;
    }

    let format = getFormat(req.query.f);
    let name = url.slice(0, -1 * format.length - 1);


    return {
        height : height,
        width: width,
        url : url,
        name : name,
        format : format
    }
}

function getParamsRotate(req) {
    let url = "../img/" + req.query.url;
    let name = getName(url);
    let format = getFormat(req);

    let direction = req.query.direction

    if (direction != "cw" && direction != "ccw") {
        direction = config.DefaultDirection;
    }

    let angle = req.query.angle;

    return {
        angle : angle,
        direction : direction,
        url : url,
        name : name,
        format : format
    }
}

function getFormat(format) {

    if(format === undefined){
        format = "png";
    }
    else{
        format = format.toLowerCase();

        if( format === "png" ||
            format === "jpeg" ||
            format === "jpg" ||
            format === "webp" ||
            format === "tiff"
        )
        {
        }
        else {
            format = config.DefaultOutputImageFormat;
        }
    }    

    return format;
}


module.exports = {
    getParamsResize,
    getParamsRotate
}