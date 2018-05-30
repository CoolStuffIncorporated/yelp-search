import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from '../Components/Search';
import Display from '../Components/Display';
import axios from 'axios';

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
    axios.get('/faves')
      .then(({res}) => this.setState({ favorites: data}))
      .catch(({err})=> console.log({err}))
  }

  componentDidMount(e) {
    e.preventDefault();
    this.fetchRestaurant();
  }

  fetchRestaurants() {
    axios.get('/restaurants')
      .then(({response}) => this.setState({ restaurants: [data.businesses, ...state]}))
      .catch((err) => console.log(`Error in fetchRestaurants: ${err}`))
  }

  fetchRestaurant() {
    axios.get('/restaurant')
      .then(({response}) => { this.setState({ restaurant: data.businesses[0] })})
      .catch((err) => console.log(`Error inside fetchRestaurant: ${err}`))
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">The Amazing Restaurant Finder</header>
        <Search 
          restaurant={this.fetchRestaurant} 
          restaurants={this.fetchRestaurants} 
        />
        <Display 
          currentVideo={this.state.currentRestaurant}
        />
      </div>
    )
  }
}