var test = [
    {
        "name": "resize",
        "width": 100,
        "height": 100,
        "percent": null
    },
    {
        "name": "flip",
        "dir": "vert"
    }
]
const ajax = require("ajax");

$.ajax({
    url: "http://localhost:3000/api?url=/Users/davidanderson/Documents/Seattle%20University/img/millie.jpg&f=jpg",
    type: "POST",
    dataType: "json",
    contentType: 'application/json',
    success: function(response) {
        if (response) {
            console.log(data.msg);
        }
    },
    data: JSON.stringify(test)
   
});