const express = require("express");
const bodyParser = require("body-parser")
const routes = require("./routes/routes_helper");
const app = express();


var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.post('/resize', routes.resizeImage);
app.post('/rotate', routes.rotateImage);
app.post('/flip', routes.flipImage);
app.post('/saturate', routes.saturateImage);
app.post('/grayscale', routes.grayscaleImage);

app.post('/api', routes.api);







app.listen(3000, () => {
 console.log("Server running on port 3000");
});

