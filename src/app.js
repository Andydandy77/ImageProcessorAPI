const express = require("express");
const routes = require("./routes/routes_helper");
const app = express();
const path = require("path");
var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(express.urlencoded({
    extended: false
  }));
  app.use(express.json());
  app.use(express.static("public"));

app.post('/api', routes.api);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status("404");
  });


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

