import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './Components/Search.jsx';
import Display from './Components/Display.jsx';
import Favorites from './Components/Favorites.jsx';
import axios from 'axios';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import {business, data} from './dummydata.js';
let businessIds = data.businesses.map(business => business.id); // dummy data for now

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      restaurants: [],
      currentIndex: 0,
      restaurantID: "UA2M9QFZghe-9th2KwLoWQ",
      restaurant: business
    }
    
    this.getRestaurants = this.getRestaurants.bind(this);
    console.log('current state of App', this.state);
  }
  componentDidMount() {
    this.getRestaurants();
    this.getRestaurant(this.state.restaurantID);
  }
  getFaves() {
    axios.get('/faves')
      .then(({res}) => this.setState({ favorites: data}))
      .catch(({err})=> console.log({err}))
  }
  getRestaurants(term = 'tacos', loc = 10017) { //@params: term('string'), loc('integer zipcode'), default params of tacos10017
    console.log('fetching restaurants of', term, loc)
    axios.get('/restaurants', {params: {term, loc}})
    // .then(({data}) => this.setState({ restaurants: data}))
    .then(({data}) => this.setState({ restaurants: data, favorites: data})) // also populate faves with the restaurants data for now
    // .then(() => console.log(this.state.restaurants))
    .catch(err => console.log(`Error in fetchRestaurants: ${err}`))
  }
  getRestaurant(id) { //@params: id('string')
    //helper func for moving to next restaurant, invoked in both save & skip funcs in Display component
    axios.get('/restaurant', {params: {id}})
      .then(({data}) => this.setState({ restaurant: data }))
      .catch((err) => console.log(`Error inside fetchRestaurant: ${err}`))
  }
  render() {
    let FoodSwiper = (props) => {
      return (
        <div>
        <Search />
        <Display restaurant={this.state.restaurant} />
        </div>
      )

    }
    let Faves = (props) => <Favorites favorites={this.state.favorites} />;
    return (
      <div className="app">
        {/* <header className="navbar">The Amazing Restaurant Finder</header> */}
        <Route exact path="/" render={FoodSwiper} />
        <Route path="/faves" render={Faves} />
      </div>
    )
  }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));



{/* <Favorites favorites={this.state.favorites} /> */}
{/* <Display restaurant={this.state.restaurant} /> */}




















/* IGNORE THIS WORK ON CONTEXT API */
// const MyContext = React.createContext();

// class MyProvider extends Component {
//   state = {
//     favorites: [dummyBiz],
//     restaurants: [dummyBiz],
//     currentRestaurant: dummyBiz,
//     restaurantID: "x7hsZRd_MyrUgAW91FM9qA"
//   }
//   render() {
//     return (
//       <MyContext.Provider value={{state: this.state}}>
//       {this.props.children}
//       </MyContext.Provider>
//     )
//   }
// }

// ReactDOM.render(<MyProvider><App /></MyProvider>, document.getElementById('root'));

///////////////////////////////////////////////////////////////////////
