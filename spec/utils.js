const MongodbMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');

// import models and server
const app = require('../server/index');
const FavoriteTest = require('../database/models/Favorite');

const mongod = new MongodbMemoryServer();

// Create connection to Mongoose before all tests
exports.before = async t =>
  mongoose.connect(await mongod.getConnectionString());

exports.beforeEach = async t => {
  let fave1 = new FavoriteTest({
    id: 'test-id-fave1',
    name: 'spaghetti and meatballs',
    alias: 'spaghetti-and-meatballs',
    image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/j8qtWFn0agAIP9ZkvHzcvA/o.jpg',
    categories: [{
      alias: 'hotdogs',
      title: 'Hot Dogs',
    }],
  });
  let fave2 = new FavoriteTest({
    id: 'test-id-fave2',
    name: 'stromboli bones',
    alias: 'stromboli-bones',
    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/KGybxfOfpWuYiJ2vKtO5QQ/o.jpg',
    categories: [{
      alias: 'spaghetti',
      title: 'Spaghetti',
    }],
  });
  let fave3 = new FavoriteTest({
    id: 'test-id-fave3',
    name: 'The Burgary',
    alias: 'the-burgary',
    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/LB7uu10Y3yG5De9pw5rJzg/o.jpg',
    categories: [{
      alias: 'hamburgers',
      title: 'Hamburgers',
    }],
  });

  await fave1.save();
  await fave2.save();
  await fave3.save();

  t.context.app = app;
};

exports.afterEach = async t => await FavoriteTest.remove();

// Disconnect MongoDB and mongoose after tests complete
exports.after = async t => {
  mongoose.disconnect();
  mongod.stop();
};
