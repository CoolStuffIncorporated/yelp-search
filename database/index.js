const mongoose = require('mongoose');
const chalk = require('chalk');
const mlab = 'mongodb://teamthor1:teamthor1@ds141320.mlab.com:41320/yelp-dev' //temp database

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
        day: Number,
      },
    ],
  }],
  rating: Number,
  transactions: [String],
  categories: [{
    alias: { type: String, required: true },
    title: { type: String, required: true },
  }],
  // could also build a validator to forbid any entries where
  // "is_closed": true
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

const getFaves = () => Favorite.find({});

const deleteFave = id => Favorite.findOneAndRemove({ id });

const addFave = (fave) => {
  const dbFave = new Favorite(fave);
  return dbFave.save();
};

module.exports = { getFaves, deleteFave, addFave };
