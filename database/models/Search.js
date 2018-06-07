const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const SearchTestSchema = new mongoose.Schema({
  user: { type: String, required: true },
  term: { type: String, required: true },
  loc: { type: Number, required: true },
  offset: { type: Number },
});

const SearchTest = mongoose.model('SearchTest', SearchTestSchema);
module.exports = SearchTest;
