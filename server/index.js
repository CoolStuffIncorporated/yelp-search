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