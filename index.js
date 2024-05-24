// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const timestampRegex = /^\d{13}/;
  const date = req.params.date;
  const currentDate = new Date();

  // Check if valid date
  let dateObj = new Date(date);

  if (timestampRegex.test(date)) {
    let timestamp = parseInt(date);
    dateObj = new Date(timestamp);
  }

  if (dateObj != "Invalid Date") {
    // Set unix string
    const unix = Math.floor(dateObj.getTime());

    // Set date string
    let dateString = dateObj.toUTCString();

    return res.json({ unix: unix, utc: dateString });

  } 
  
  else if (date === undefined) {
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });

  } 
  
  else {
    return res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
