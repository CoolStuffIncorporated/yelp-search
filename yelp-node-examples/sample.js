'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'YTl6Wm-0stpU35hXMsQ3Vgq8Ryz0bXwC05a1UnEZpWXcVdi5rUgvZceURzfW_TlRCTuCHa1aqgaJd2_B36kAzlczzv6tt9uelElqY0HgmLt8P87BOm1IzwT0PokNW3Yx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});