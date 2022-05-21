const config = require('../../config.json');


let getParamsResize = (func) => {
    let width = func.width
    let height = func.height;
    let percent = parseFloat(func.percent);

    
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



    return {
        percent : percent,
        height : height,
        width: width,
    }
}

function getParamsRotate(func) {
    let direction = func.direction

    if (direction != "cw" && direction != "ccw") {
        direction = config.DefaultDirection;
    }
    
    let angle = parseFloat(func.angle);
    if (isNaN(angle))
        angle = 90;

    return {
        angle : angle,
        direction : direction,
    }
}

function getParamsFlip(func) {

    let direction = func.dir;

    if (direction != "vert" && direction != "hor") {
        direction = config.DefaultFlipDirection;
    }

    return {
        direction : direction
    }
}

function getParamsSaturate(func) {

    let saturation = parseFloat(func.saturation);

    return {
        saturation : saturation,
    }

}

function getParamsGrayscale(func) {
    let amount;
    if (!isNaN(func.amount)) {
        amount = parseFloat(func.amount);
    }


    return {
        amount : amount,
    }

}



function getFormat(format) {

    if(format === undefined){
        format = "png";
    }
    else{

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
    getParamsRotate,
    getParamsFlip,
    getParamsSaturate,
    getParamsGrayscale
}