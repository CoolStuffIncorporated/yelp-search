[![Waffle.io - Columns and their card count](https://badge.waffle.io/CoolStuffIncorporated/yelp-search.png?columns=all)](https://waffle.io/CoolStuffIncorporated/yelp-search?utm_source=badge)
# Yelp Tinder

## Specs
User should be able to:
- arrive on landing page and search restaurants by location
- be presented with randomized (or sorted by popularity) restaurant profiles
- read a description of the restaurant profile
- swipe through a restaurant's pictures
- swipe right to add restaurants to faves
- swipe left to dislike restaurant and remove it from searches forever
- click to access faves

aStack: MERN + axios

Documentation: Charlie + Rose

* Specs + User stories

* Code explanations

Tasks:

* Find API endpoints and exact queries to use to get

* Determine SCRUM roles

* Fill out project backlog

* Finalize project design

* Test yelp fusion npm package

* Create React components

* Add react-router-dom routing to React components

* Link and test database

Useful Links

Waffleboard Invite: [https://waffle.io/CoolStuffIncorporated/yelp-search/join](https://waffle.io/CoolStuffIncorporated/yelp-search/join)

Git Repository: [https://github.com/CoolStuffIncorporated/yelp-search](https://github.com/CoolStuffIncorporated/yelp-search)

Scrum Roles:

* Rose - Product Owner

* Charles - Scrum Master

* Nick - Dev Team

* Alon - Dev Team

[[TOC]]

## Yelp Fusion v3 API notes


#### Authentication

[Authentication](https://www.yelp.com/developers/documentation/v3/authentication#where-is-my-client-secret-going)

With just API Keys the process to authenticate is:

1. Get your API Key from the [Manage App](https://www.yelp.com/developers/v3/manage_app) page.

2. Put the API Key in the request header as "Authorization: Bearer <YOUR API KEY>".

Alternatively, use the promise-based [yelp-fusion NPM package](https://www.npmjs.com/package/yelp-fusion) (linked below).

#### API Notes

* [List of all categories on Yelp](https://www.yelp.com/developers/documentation/v3/all_category_list)  - we could use these to populate our food category dropdown

* [yelp-fusion NPM package](https://www.npmjs.com/package/yelp-fusion) - pre-built authentication and querying functionality

    * [Yelp Code Sample for Node](https://github.com/Yelp/yelp-fusion/tree/master/fusion/node) (added to git repo)

* Sample responses in git repo!

* [Business Search](https://www.yelp.com/developers/documentation/v3/business_search) (/businesses/search) - pass in optional category string to filter results

* [Business Detail](https://www.yelp.com/developers/documentation/v3/business) (/businesses) - saved to MongoDB, used to populate front-end. Main fields of interest at present pertain to business name and links to relevant photos.

* Earlier version of API required Oauth for authentication - this is **now deprecated**. New API released in late 2017 and is significantly different. Make sure you’re googling for the right version!

    * API now supports **GraphQL**

### Business Detail Search (/businesses/search)

This endpoint returns up to 1000 businesses based on the provided search criteria.

```javascript
    {
  "total": 8228,
  "businesses": [
    {
      "rating": 4,
      "price": "$",
      "phone": "+14152520800",
      "id": "E8RJkjfdcwgtyoPMjQ_Olg",
      "alias": "four-barrel-coffee-san-francisco",
      "is_closed": false,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        }
      ],
      "review_count": 1738,
      "name": "Four Barrel Coffee",
      "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
      "coordinates": {
        "latitude": 37.7670169511878,
        "longitude": -122.42184275
      },
      "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
      "location": {
        "city": "San Francisco",
        "country": "US",
        "address2": "",
        "address3": "",
        "state": "CA",
        "address1": "375 Valencia St",
        "zip_code": "94103"
      },
      "distance": 1604.23,
      "transactions": ["pickup", "delivery"]
    },
    // ...
  ],
  "region": {
    "center": {
      "latitude": 37.767413217936834,
      "longitude": -122.42820739746094
    }
  }
}
```


### Mongoose Schema Notes

* Presently saving most fields returned by calls to Business Detail (businesses/search) endpoint

* If user swipes right on a restaurant, that restaurant is saved to another favorites database. Most important information to store (for now):

    * restaurant unique identifier

    * restaurant name

    * restaurant website

    * array of photos for that restaurant (usually contains three urls that **may or may not be of food**)

### **### package.json, Webpack notes**

* Installed the airbnb JavaScript/React style-guide

* Run `npm run start:dev` to start webpack (in watch and debug mode) and nodemon simultaneously (OSX/Linux only)

* Run `npm run server:dev` to start nodemon

* Run `npm run react:dev` to start webpack in watch and debug mode

* Tentative plans to add **react-router-dom** with **BrowserRouter** for navigation

* Basic terminal logging done in** ****chalk**

* Using **Babel** with **env** and **react**** **presets

* Webpack entry at **client/src/App.jsx**; bundle output to **client/dist/bundle.js**

### **### Style Guide**

* [Airbnb Style Guide](https://www.npmjs.com/package/eslint-config-airbnb)

    * modified to ignore some of the more annoying rules (see repository .eslintrc.js)

### [Chalk](https://github.com/chalk/chalk)

Use [chalk](https://github.com/chalk/chalk) to add colorful terminal logging! Makes spotting errors easier with live apps.

Example of Chalk output in terminal:

![image alt text](image_0.png)

Here are some chalk aliases I put together for an earlier project - no obligation to use them, but might save you some legwork.

```javascript
const chalk = require('chalk');

console.log(chalk.red.bold('ERROR ERROR'); // will appear as bold red text in Terminal/in Heroku logs/etc.

const log = console.log;
const succ = chalk.bold.green.bgWhite; // use to log success
const errc = chalk.bold.red.bgBlack; // UH OH
const warc = chalk.underline.orange; // log concerning but non-breaking
const infoc = chalk.blue.bgBlack; // log general information

// looks something like this:

 axios.get(searchUri, {
   params: params,
 })
   .then((response) => {
     log(succ('Response received: ', response));
     res.send(response.data);
   })
   .catch((error) => {
     log(errc('Error! ', error));
     res.send(error);
   });
```

**Please note - doesn’t work for browser logging!**

### Mongo DB Notes

Example connection to Mongo Atlas using Node:

```javascript
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://kay:myRealPassword@cluster0.mongodb.net/test";
MongoClient.connect(uri, function(err, client) {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
```

### Stretch Goals

* Multiple user login

* Request user location on page load

* Picture collage

* Geolocation

    * [Using Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)

    * [Get HTTPS for Free](https://gethttpsforfree.com)

* "Hates" database for storing restaurants users have swiped left on

* More detailed information saved on favorites page

* GraphQL

### Git Workflow

* Master branch push access restricted to admin

* Team works off of dev branch and submits pull requests to master as necessary

* Branches made for individual features

* Ignoring webpack bundle.js output and API credentials

* Master linked to Travis CI and to AWS for continuous deployment

### Travis CI

Using Travis CI and .travis.yml to do continuous deploys to AWS (eventually)

Still figuring out how encryption works - they seem to have a different syntax for using travis encrypt if you’re an organization