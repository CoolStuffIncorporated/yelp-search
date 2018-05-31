const express = require('express');
const { save, Favorites } = require('./index');

// input: n/a
// output: an array containing saved faves w/ pic and url
const getFavoritesFromDB = async () => {
  try {
    const favorites = await Favorites.find({});
    return favorites;
  } catch (err) {
    console.error(err);
  }
};

// input: id of the fave to delete
// output: n/a
const deleteFavoritesFromDB = async (id) => {
  try {
    const deletedFavorite = await Favorites.deleteOne({ id: id });
    console.log('deleted from Favorites!');
  } catch (err) {
    console.error(err);
  } 
};

// input: object containing fave url and pics
// output: let user know has been saved
const postFavoritesToDB = (restaurantObj) => { 
  // should post new restaurant to DB 
  // being invoked in server index.js 
  try {
    Favorites.update(restaurantObj); 
  } catch (err) {
    console.error(err);
  }
}; 

module.exports.getFavoritesFromDB = getFavoritesFromDB; 
module.exports.deleteFavoritesFromDB = deleteFavoritesFromDB; 
module.exports.postFavoritesToDB = postFavoritesToDB; 
