[![Waffle.io - Columns and their card count](https://badge.waffle.io/CoolStuffIncorporated/yelp-search.png?columns=all)](https://waffle.io/CoolStuffIncorporated/yelp-search?utm_source=badge)
# Yelp Tinder

## Specs
User should be able to:
- arrive on landing page and search restaurants by location
- be presented with nearby restaurant profiles
- read a description of the restaurant profile
- browse through a restaurant's pictures
- add restaurants to faves
- dislike restaurant and remove it from searches forever
- access faves
- pick up their last search term & location pair where they left off

## Stack + libraries
- MongoDB
- Express
- ReactJS + react-router-dom + react-transition-groups
- NodeJS
- Sass
- Axios
- HTML Canvas API
- FontAwesome
- Materialize CSS
- Awesomplete
- Ava & Supertest & MongoDB Memory Server
- Travis
- Google Cloud
- Docker
- Yelp-fusion node wrapper
- Chalk

Useful Links

Waffleboard Invite: [https://waffle.io/CoolStuffIncorporated/yelp-search/join](https://waffle.io/CoolStuffIncorporated/yelp-search/join)

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

* API now supports **GraphQL** ( but with caveats )

### Business Detail Search (/businesses/search)

This endpoint returns up to 1000 businesses based on the provided search criteria.
See the `dummyData.js` file for examples of what's returned.

### Mongoose Schema Notes

**Faves** Database - contains the full restaurant object of each restaurant saved by the user
**Search** Database -- contains the snapshot of where the user currently is in each search term:
e.g. if a user searches "burgers" at "10017" and swipes through 4 restaurants, their offset is 4, and they'll start up on the 5th restaurant next time they do the same food-location search.

### Sass
The import functionality of Sass works like ES6 modules. `.scss` files are to `main.scss` and `main.css` what `.jsx` files are to `app.jsx` and `bundle.js`. You can write regular css in `.scss` files, but do try to harness the extended functionality of Sass to organize your styling and speed up your workflow: https://sass-lang.com/guide

### **### package.json, Webpack notes**

* Installed the airbnb JavaScript/React style-guide

* Run `npm run start:dev` to start webpack (in watch and debug mode) and nodemon simultaneously (OSX/Linux only)

* Run `npm run server:dev` to start nodemon

* Run `npm run react:dev` to start webpack in watch and debug mode

* Run `npm run watch-css` to bundle your Sass files into `main.css`

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

* Multiple user login using OAuth

* Request user location on page load

* Picture collage

* Geolocation

    * [Using Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)

    * [Get HTTPS for Free](https://gethttpsforfree.com)

* More detailed information saved on favorites page

* Machine learning to learn the user's habits and what they like, in order to give suggestions

### Git Workflow

* Master branch push access restricted to admin

* Team works off of their personal branches and submit pull requests to dev; dev is merged to master which autodeploys

* Branches made for individual features

* Ignoring webpack bundle.js output and API credentials

* Master linked to Travis CI and to AWS for continuous deployment

### Travis CI

Using Travis CI and .travis.yml to do continuous deploys to AWS (eventually)
