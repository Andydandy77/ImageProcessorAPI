const config = require('../../config.json');

class ParamsBuilder {


    static getParams(func) {
        switch (func.name) {
            case 'Resize':
                return this.getParamsResize(func)
            case 'Flip':
                return this.getParamsFlip(func);
            case 'Rotate':
                return this.getParamsRotate(func);
            case 'Saturate':
                return this.getParamsSaturate(func)
            case 'Grayscale':
                return this.getParamsGrayscale(func);

        }
        
    }

    static getParamsResize(func) {
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
    
    static getParamsRotate(func) {
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
    
    static getParamsFlip(func) {
    
        let direction = func.direction;
    
        if (direction != "vert" && direction != "hor") {
            direction = config.DefaultFlipDirection;
        }
    
        return {
            direction : direction
        }
    }
    
    static getParamsSaturate(func) {
    
        let saturation = parseFloat(func.saturation);
    
        return {
            saturation : saturation,
        }
    
    }
    
    static getParamsGrayscale(func) {
        let amount;
        if (!isNaN(func.amount)) {
            amount = parseFloat(func.amount);
        }
    
    
        return {
            amount : amount,
        }
    
    }
    
    
    
    static getFormat(format) {
    
        if(format === undefined){
            format = "jpg";
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

}

module.exports =  ParamsBuilder;
