import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from '../Components/Search';
import Display from '../Components/Display';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      restuarants: [],
      currentRestaurant: {},
      restaurantID: {}
    }
    this.fetchDetails = this.fetchDetails.bind(this);
    this.fetchDetails = this.fetchDetails.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
  }

  showFavorites(){

  }

  componentDidMount(e) {
    e.preventDefault();

  }

  fetchRestaurants(){

  }

  fetchRestaurant() {

  }

  render() {
    return (
      <div className="app">
        <header className="navbar">The Amazing Restaurant Finder</header>
        <Search 
          restaurant={this.fetchRestaurant} 
          restaurants={this.fetchRestaurants} 
        />
        <Display currentVideo={this.state.currentRestaurant}/>
      </div>
    )
  }
}