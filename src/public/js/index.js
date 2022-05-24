
let formData = new FormData();
var img = {};
let imgName;
let uploadUrl
    const imgInput = document.getElementById('inputFile');

    imgInput.addEventListener('change', () => {
        formData.append('file', imgInput.files[0]);
        imgName = imgInput.files[0].name;
        console.log(imgInput.files[0]);
        uploadUrl = URL.createObjectURL(imgInput.files[0])
        $("#original").fadeIn("fast").attr('src', uploadUrl); 
    });


$("#submit").on('click', (e) => {
    e.preventDefault();
    let selectedFuncs = [];
    let imageFormat = $("#imageFormat").val();
    $('input[type="checkbox"]:checked').each(function() { 
        selectedFuncs.push({"name":this.value});
        let index = selectedFuncs.length - 1;
        selectedFuncs[index]["priority"] = parseInt($("#priorityInput" + this.value).val());
        switch (this.value) {
            case "Flip":
                selectedFuncs[index]["name"] = "Flip";
                selectedFuncs[index]["direction"] = "vert";                
                break;
            case "Flop":
                selectedFuncs[index]["name"] = "Flop";
                selectedFuncs[index]["direction"] = "hor";                      
                break;
            case "Rotate":
                selectedFuncs[index]["direction"] = $("#directionInputRotate").val();
                selectedFuncs[index]["angle"] = parseInt($("#angleInputRotate").val());
                break;
            case "Grayscale":
                selectedFuncs[index]["amount"] = parseInt($("#amountInputGrayscale").val());                
                break;
            case "Saturate":
                selectedFuncs[index]["amount"] = parseInt($("#amountInputSaturate").val());                
                break;
            case "Desaturate":
                selectedFuncs[index]["amount"] = parseInt($("#amountInputDesaturate").val());                
                break;
            case "Resize":
                selectedFuncs[index]["width"] = parseInt($("#widthInputResize").val());                
                selectedFuncs[index]["height"] = parseInt($("#heightInputResize").val());                
                selectedFuncs[index]["percent"] = parseInt($("#percentInputResize").val());                
                break;
            case "Thumbnail":
                break;
        }


    });
    orderFunctionByPriority(selectedFuncs);
    if (imageFormat == "Choose Image Format") {
        imageFormat = 'jpg';
    }

    formData.append("json", JSON.stringify(selectedFuncs));
    try {
        fetch('/api?f=' + imageFormat, {
            method: 'POST',
            body: formData
          }).then(response => response.blob())
          .then(imageBlob => {
            const blobUrl = URL.createObjectURL(imageBlob)
            $("#changed").fadeIn("fast").attr('src', blobUrl);
                
            let name = imgName.slice(0, -1 * imageFormat.length - 1);

            $("#download").fadeIn("fast").attr('href', blobUrl);
            $("#download").attr('download', name + '.' + imageFormat);
    
          })
              

    } catch (e) {
        console.log(e);
    }
});


$("#reset").on('click', (e) => {
    window.location.reload();

})

function orderFunctionByPriority(funcs) {
    funcs.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
}


