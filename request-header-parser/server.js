var express = require('express');
var app = express();

app.get("/", function (request, response) {
  const userInfo = {
    ip: request.headers["x-forwarded-for"].split(',')[0],
    lang: request.headers["accept-language"].split(',')[0],
    soft: request.headers["user-agent"].split(/[()]+/)[1],
  }
  response.send(JSON.stringify(userInfo));
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
