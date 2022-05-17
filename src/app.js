const express = require("express");
const routes = require("./routes_helper");
const app = express();


app.get('/resize', routes.resizeImage);
app.get('/rotate', routes.rotateImage);
app.get('/flip', routes.flipImage);



app.listen(5500, () => {
 console.log("Server running on port 5500");
});

