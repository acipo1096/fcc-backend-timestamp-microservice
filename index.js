// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req,res) {    
  
  const regex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  // See below for explanation
  /*
  Certainly! The regular expression `const regex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;` is designed to match date strings formatted as "YYYY-MM-DD". Let’s break down each part of this regex to understand how it validates the date format:

1. **`^`**: This symbol marks the beginning of a line. The regex will only match if the string starts exactly with the pattern that follows.

2. **`(\d{4})`**:
   - `\d`: Represents any digit (0-9).
   - `{4}`: Specifies that exactly four digits should appear consecutively.
   - This part captures four digits representing the year.

3. **`-`**: This is a literal hyphen character. It separates the year from the month in the date string.

4. **`(0[1-9]|1[0-2])`**:
   - `0[1-9]`: Matches a leading zero followed by any digit from 1 to 9, covering all months from January (01) to September (09).
   - `|`: This is the OR operator, allowing either of the patterns on its sides to match.
   - `1[0-2]`: Matches a '1' followed by either '0', '1', or '2', covering the months October (10), November (11), and December (12).
   - This part ensures that the month is valid (01 through 12).

5. **`-`**: Another literal hyphen character, separating the month from the day in the date string.

6. **`(0[1-9]|[12][0-9]|3[01])`**:
   - `0[1-9]`: Matches a leading zero followed by any digit from 1 to 9, covering all valid single-digit days (01 to 09).
   - `[12][0-9]`: Matches either '1' or '2' followed by any digit from 0 to 9, covering all days from 10 to 29.
   - `3[01]`: Matches a '3' followed by either '0' or '1', covering the 30th and 31st days of a month.
   - This part ensures that the day is valid, from 01 to 31. Note, however, that it does not account for shorter months or leap years; those validations require further checking beyond regex alone.

7. **`$`**: This symbol marks the end of a line. The regex will only match if the string ends exactly with the pattern that precedes.

This regex ensures that the input string strictly adheres to the "YYYY-MM-DD" format with potential validity as a calendar date, though it does not exclude invalid dates like February 30th or February 29th on non-leap years. For more precise date validation (considering month lengths and leap years), additional logic is required, typically involving parsing the string into a date object as demonstrated previously.
  */

  const date = req.params.date;
  const currentDate = new Date();
  const dateObj = new Date(date);

  // Modifiers
  // Get timestring from date object
  dateObj.getTime();

  // Set unix string
  const unix = Math.floor(dateObj.getTime() / 1000);

  // Convert date object to date string for json
  dateString = dateObj.toString();

  if (date == undefined) {
    res.json({
      unix: currentDate.getTime(),
      utc: currentDate.getTime()
    });
  }
  else if (!regex.test(date) && date !== undefined) {
    res.json({error: "Invalid Date"});
  } 
  else {
    res.json({unix: unix, utc: dateString });
  }

})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
