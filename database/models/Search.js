const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const SearchSchema = new mongoose.Schema({
  user: { type: String, required: true },
  term: { type: String, required: true },
  loc: { type: Number, required: true },
  offset: { type: Number },
});

const Search = mongoose.model('Search', SearchSchema);
module.exports = Search;
