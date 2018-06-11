const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');

// import chalk logging
const {
  log, succ, errc, warc, infoc,
} = require('../chalkpresets');

// EXPRESS SETUP
// uncomment for https
const https = require('https');
const fs = require('fs');

const app = express();
// define server port
const port = process.env.PORT || 3000;

// import routing
const router = require('./router.js');

// apply middleware
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(compression())
  // .use(morgan('tiny')) /* uncomment for logging */
  .use((express.static(path.join(__dirname, '/../client/dist'))))
  .use('/faves', router)
  .use('/restaurant', router)
  .use('/search', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// uncomment for http
// app.listen(port, () => {
//   log(succ(`Port ${port} is lit fam 🔥 🔥 🔥`));
// });

// uncomment for https
// key and cert files available on Google Drive
// needed for service workers/local storage/geolocation api
https.createServer({
  key: fs.readFileSync(path.join(__dirname, './env/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './env/server.cert')),
}, app)
  .listen(3000, () => {
    console.log(`Port ${port} is lit fam 🔥 🔥 🔥`);
  });

// export to make available to test suite
module.exports = app;


// Rose test case:
// getRestaurants({term: 'tacos', loc: 10017})
// .then(restaurants => console.log('success'))
// .catch(err => console.log(err));
