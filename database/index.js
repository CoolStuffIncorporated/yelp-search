const mongoose = require('mongoose');
const chalk = require('chalk');

const log = console.log;
const succ = chalk.bold.green.bgWhite; // use to log success
const errc = chalk.bold.red.bgBlack; // UH OH
const warc = chalk.underline.orange; // log concerning but non-breaking
const infoc = chalk.blue.bgBlack; // log general information

let config;
try {
  config = require('../config.js').MONGO;
} catch (err) {
  config = process.env.MONGO;
}

// mongoose housekeeping
const Schema = mongoose.schema;

mongoose.connnect(process.env.MONGO || 'mongodb://localhost');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  log(succ('Connected to Mongo database successfully'))
})


let BusinessesSchema = new Schema({
  businessId: { type: String, required: true },
  name: { type: String, required: true },
});

let BusinessSchema = new Schema({
  businessId: { type: String, required: true },

})

let Favorites = 

let Businesses = mongoose.model('Business', )
// business
// id - grab id
// in an array

// restaurants



// favorites

