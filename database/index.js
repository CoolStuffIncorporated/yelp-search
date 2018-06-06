const mongoose = require('mongoose');
const chalk = require('chalk');
const mlabAlon = 'mongodb://teamthor1:teamthor1@ds141320.mlab.com:41320/yelp-dev' //temp database
const mlab = 'mongodb://rose:rose00@ds141320.mlab.com:41320/yelptemp'

const log = console.log;
const succ = chalk.bold.green.bgWhite; // use to log success
const errc = chalk.bold.red.bgBlack; // UH OH
const warc = chalk.underline.orange; // log concerning but non-breaking
const infoc = chalk.blue.bgBlack; // log general information

let config;
try {
  config = require('../server/env/config.js').MONGO;
} catch (err) {
  config = process.env.MONGO;
}

mongoose.connect(process.env.MONGO || mlab || 'mongodb://localhost');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => log(succ('Connected to Mongo database successfully')));

const FavoriteSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  alias: { type: String, required: true },
  image_url: { type: String, required: true },
  url: String,
  phone: String,
  display_phone: String,
  location: Object,
  photos: [String],
  price: String,
  hours: [{
    open: [
      {
        is_overnight: Boolean,
        start: String,
        end: String,
        day: Number
      }
    ]
  }],
  rating: Number,
  transactions: [String],
  categories: [{
    alias: { type: String, required: true },
    title: { type: String, required: true }
  }],
  // could also build a validator to forbid any entries where
  // "is_closed": true
});

const SearchSchema = new mongoose.Schema({
  user: { type: String, required: true },
  term: { type: String, required: true },
  loc: { type: Number, required: true },
  offset: { type: Number }
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);
const Search = mongoose.model('Search', SearchSchema);

// const addSearch = (term, loc, offset)

const getOffset = (user, term, loc) => {
  console.log('getting offset', user, term, loc);
  return Search.findOne({user, term, loc})
    .then(data => {
      if (!data) {
        console.log('creating new search', user, term, loc);
        let entry = new Search({user, term, loc, offset: 0});
        entry.save().then(data => data.offset)
        .catch(err => console.log('error making new search', err)) // TODO: proper error handling
      } else return data.offset;
    })
    .catch(err => console.error(err));  // TODO: proper error handling
}

const getFaves = () => Favorite.find({});

const deleteFave = id => Favorite.findOneAndRemove({id});

const addFave = fave => {
  let dbFave = new Favorite(fave);
  return dbFave.save();
};

module.exports = { getFaves, deleteFave, addFave, getOffset };