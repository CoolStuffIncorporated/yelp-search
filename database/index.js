const mongoose = require('mongoose');

// import models
const Favorite = require('./models/Favorite');
const Search = require('./models/Search');

const {
  log, succ, errc, warc, infoc,
} = require('../chalkpresets');

let config;
try {
  config = require('../server/env/config.js').MONGO;
} catch (err) {
  config = process.env.MONGO;
}

mongoose.connect(config || 'mongodb://localhost');
const db = mongoose.connection;
db.on('error', (error) => {
  log(errc(`DB connection failed: ${error}`));
});
db.once('open', () => log(succ('Connected to Mongo database successfully')));

const getOffset = (user, term, loc) => {
  console.log('getting offset', user, term, loc);
  return Search.findOne({ user, term, loc })
    .then(data => {
      if (!data) {
        const entry = new Search({
          user, term, loc, offset: 0,
        });
        entry.save().catch(err => console.log('error making new search', err));
        return 0; // TODO: error handling
      } return data.offset;
    })
    .catch(err => console.error(err)); // TODO: proper error handling
};

const updateOffset = (user, term, loc, offset) =>
  Search.findOneAndUpdate({ user, term, loc }, { offset }, { new: true });

const getFaves = () => Favorite.find({});

const deleteFave = id => Favorite.findOneAndRemove({ id });

const addFave = fave => {
  const dbFave = new Favorite(fave);
  return dbFave.save();
};

module.exports = {
  db, getFaves, deleteFave, addFave, getOffset, updateOffset,
};
