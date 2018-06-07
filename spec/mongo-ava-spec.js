// Testing Libraries
import test from 'ava';
import request from 'supertest';
// import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';

// Server and Models
// import * as app from '../server/index';
// import * as database from '../database/index';
import FavoriteTest from '../database/models/Favorite';

import { before, beforeEach, afterEach, after } from './utils';

// Start MongoDB instance
const mongod = new MongodbMemoryServer();

// Create connection to Mongoose before tests are run
test.before(before);
test.beforeEach(beforeEach);
test.afterEach.always(afterEach);

test.afterEach.always(() => FavoriteTest.remove());

// Note: tests are run serially
// test.serial('get favorite', async (t) => {
//   const { app } = t.context;
//   const res = await request(app)
//     .get('/faves')
//     .send({ id: 'x7hsZRd_MyrUgAW91FM9qA' });
//   t.is(res.status, 200);
//   t.is(res.body.name, 'One');
// });

test.serial('Create favorite', async t => {
  const { app } = t.context
  const res = await request(app)
    .post('/faves')
    .send({fave: {
      id: 'test-id-fave1',
      name: 'spaghetti and meatballs',
      alias: 'spaghetti-and-meatballs',
      image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/j8qtWFn0agAIP9ZkvHzcvA/o.jpg',
      categories: [{
        alias: 'hotdogs',
        title: 'Hot Dogs',
      }],  
    }})
  t.is(res.status, 200)
  t.is(res.body.name, 'spaghetti and meatballs')

  // verifies new fave was created
  const newFave = await FavoriteTest.findOne({ id: 'test-id-fave1' })
  t.is(newFave.alias, 'spaghetti-and-meatballs');
});

test.after.always(after);
