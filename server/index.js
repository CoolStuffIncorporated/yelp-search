let API_KEY;
try {
  API_KEY = require('./config.js').API_KEY;
} catch (err) {
  API_KEY = process.env.API_KEY;
}

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/faves', (req, res) => {
  // use database helper here
  res.send('received your request to get faves!');
})

app.post('/faves', (req, res) => {
  let data = req.body;
    // use database helper here
  res.send('successfully added restaurant to faves!');
})

app.delete('/faves', (req, res) => {
    // use database helper here
  res.send('deleted restaurant from faves!');
})

app.get('/restaurants', (req, res) => {
  let {term, loc} = req.body;
  // use API helper here to make a request to Yelp API to grab list of 50 restaurants by id
  // send back array of ids
  res.send(`here's your list of restaurant ids`);
});

app.get('/restaurant', (req, res) => {
  let {id} = req.body;
  // use another api helper here to make a request to API to grab details of selected restaurant
  // send back restaurant data
  res.send(`here's your restaurant data with the pics too`);
});

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('listening on port 3000!');
});