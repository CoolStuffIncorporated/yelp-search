const mongoose = require('mongoose');

const mlab = 'mongodb://rose:rose00@ds141320.mlab.com:41320/yelptemp'

const {
  log, succ, errc, warc, infoc,
} = require('../server/chalkpresets');

let config;
try {
  config = require('../server/env/config.js').MONGO;
} catch (err) {
  config = process.env.MONGO;
}

mongoose.connect(config || mlab || 'mongodb://localhost');
const db = mongoose.connection;
db.on('error', (error) => log(errc(`DB connection failed: ${error}`)));
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

const getOffset = (user, term, loc) => {
  log(infoc('getting offset', user, term, loc));
  return Search.findOne({user, term, loc})
    .then(data => {
      if (!data) {
        const entry = new Search({user, term, loc, offset: 0});
        entry.save().catch(err => log(errc('error making new search', err)))
        return 0; // TODO: error handling
      } return data.offset;
    })
    .catch(err => console.error(err)); /* TODO: proper error handling */
}

const updateOffset = (user, term, loc, offset) => 
  Search.findOneAndUpdate({user, term, loc}, {offset}, {new: true});

const getFaves = () => Favorite.find({});

const deleteFave = id => Favorite.findOneAndRemove({id});

const addFave = fave => {
  let dbFave = new Favorite(fave);
  return dbFave.save();
};

module.exports = { getFaves, deleteFave, addFave, getOffset, updateOffset };