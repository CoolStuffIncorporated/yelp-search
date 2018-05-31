const express = require('express');
const { save, Favorites } = require('./index');

// input: n/a
// output: an array containing saved faves w/ pic and url
const getFavoritesFromDB = async () => {
  try { 
    const favorites = await Favorites.find({}); 
    console.log(favorites); 
  } catch (err) { 
    console.error(err); 
  } 
};

// input: id of the fave to delete
// output: n/a
const deleteFavoritesFromDB = (id) => {
  Favorites.deleteOne({ id: id }, (err) => { console.error(err); }); 
};

// input: object containing fave url and pics
// output: let user know has been saved
const postFavoritesToDB = () => { 
  // should post new restaurant to DB 
  // being invoked in server index.js 
  Favorites.updateOne({ id: }) 
}; 
 
module.exports.getFavoritesFromDB = getFavoritesFromDB; 
module.exports.deleteFavoritesFromDB = deleteFavoritesFromDB; 
module.exports.postFavoritesToDB = postFavoritesToDB; 
