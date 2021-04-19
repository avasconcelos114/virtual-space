const request = require('request');
const app = require('express')();

app.all('/thumbnail/:url', (req, res) => {
  res.contentType('image/png');
  if (req.params.url) {
    request.get(`https://avatars.slack-edge.com/${req.params.url}`).pipe(res);
    return;
  }
  res.send(null);
});

module.exports = app;
