const express = require("express");
const routes = require("./routes_helper");
const app = express();


app.get('/resize', routes.resizeImage);
app.get('/rotate', routes.rotateImage);



app.listen(3000, () => {
 console.log("Server running on port 3000");
});

