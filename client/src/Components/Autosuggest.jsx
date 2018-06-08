import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

const categories = ['burgers', 'hot dogs', 'salad', 'ramen', 'tacos', 'bakery', 'brewery', 'bubble tea', 'coffee', 'desserts', 'donuts', 'gelato', 'ice cream', 'poke', 'pretzels', 'chocolate', 'pasta', 'wineries', 'cheese', 'candy', 'halal', 'sushi'];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : categories.filter(category =>
    category.name.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export default Autosuggest;
